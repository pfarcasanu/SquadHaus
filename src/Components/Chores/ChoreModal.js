import React, { useState, useEffect } from 'react';
import {
  Modal, Field, Control, Input, Label, Select, Delete, Button, Container,
} from 'rbx';
import { addChore } from './choresFunctions';
import { weekdays, monthdays } from '../../Shared/date';

const ChoreModal = ({ house, modalState }) => {
  const [title, setTitle] = useState('');
  const [cycle, setCycle] = useState('weekly');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayOptions, setDayOptions] = useState(weekdays);
  const users = house?.users ? Object.keys(house.users) : [];

  const handleUserChange = (options) => {
    const userNames = [];
    const userIDs = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        userNames.push(options[i].value);
        userIDs.push(users[i]);
      }
    }
    setSelectedUsers(userNames);
    setSelectedIDs(userIDs);
  };

  const handleChange = (options, fn) => {
    const values = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    fn(values);
  };

  const closeModal = () => {
    modalState.setModalVisible(false);
    setTitle('');
    setCycle('weekly');
    setSelectedDays([]);
    setSelectedUsers([]);
    setSelectedIDs([]);
  };

  const onSubmit = () => {
    const data = {
      cycle,
      title,
      frequency: selectedDays.join(', '),
      users: selectedUsers,
      numUsers: selectedUsers.length,
      userIDs: selectedIDs,
      curr: 0,
    };
    addChore(house, data);
    closeModal();
  };

  const canBeSubmitted = () => (title.length > 0 && cycle.length > 0 && selectedDays.length > 0
    && selectedUsers.length > 0);

  useEffect(() => {
    if (cycle === 'weekly') setDayOptions(weekdays);
    else setDayOptions(monthdays);
  }, [cycle]);

  return (
    <Modal active={modalState.modalVisible}>
      <Modal.Background onClick={() => closeModal()} />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Add Chore</Modal.Card.Title>
          <Delete onClick={() => closeModal()} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field>
            <Label>Name / Description</Label>
            <Control>
              <Input
                placeholder="Dishes"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Control>
          </Field>
          <Field>
            <Label>Cycle</Label>
            <Control>
              <Select.Container fullwidth>
                <Select
                  onChange={(e) => setCycle(e.target.value)}
                >
                  <Select.Option>weekly</Select.Option>
                  <Select.Option>monthly</Select.Option>
                </Select>
              </Select.Container>
            </Control>
          </Field>
          <Field>
            <Label>Repeat On</Label>
            <Control>
              <Select.Container fullwidth>
                <Select
                  multiple
                  size={3}
                  onChange={(e) => handleChange(e.target.options, setSelectedDays)}
                >
                  {dayOptions.map((item) => <Select.Option key={item}>{item}</Select.Option>)}
                </Select>
              </Select.Container>
            </Control>
          </Field>
          <Field>
            <Label>People</Label>
            <Control>
              <Select.Container fullwidth>
                <Select
                  multiple
                  size={3}
                  onChange={(e) => handleUserChange(e.target.options)}
                >
                  {users.map((key) => (
                    <Select.Option key={key}>
                      {house.users[key].name}
                    </Select.Option>
                  ))}
                </Select>
              </Select.Container>
            </Control>
          </Field>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Container>
            <Button.Group align="centered" size="medium">
              <Button color="primary" onClick={() => onSubmit()} disabled={!canBeSubmitted()}>
                Submit
              </Button>
            </Button.Group>
          </Container>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

export default ChoreModal;
