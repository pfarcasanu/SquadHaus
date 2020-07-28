import React, { useState } from 'react';
import {
  Modal, Content, Delete, Field, Control, Input, Button, Select, Container, Label,
} from 'rbx';
import { addPayment } from './paymentsFunctions';
import { monthdays } from '../../Shared/date';

const NewPayment = ({ house, modalState }) => {
  const users = house?.users ? Object.keys(house.users) : [];
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(1);
  const [payeeUser, setPayeeUser] = useState();
  const [payeeUserID, setPayeeUserID] = useState();
  const [payerUsers, setPayerUsers] = useState([]);
  const [payerUserIDs, setPayerUserIDs] = useState([]);

  const resetForm = () => {
    setTitle('');
    setValue('');
    setDate(1);
    setPayerUsers([]);
    setPayerUserIDs([]);
    setPayeeUser([]);
    setPayeeUserID([]);
  };

  const onClose = () => {
    resetForm();
    modalState.setModalVisible(false);
  };

  const onSubmit = () => {
    const data = {
      title,
      value,
      date,
      payers: payerUsers,
      payerIDs: payerUserIDs,
      payee: payeeUser || (users.length > 0 && house.users[users[0]]).name,
      payeeID: payeeUserID || (users.length > 0 && users[0]),
    };
    addPayment(house, data);
    onClose();
  };

  const canBeSubmitted = () => (title.length > 0 && value.length > 0 && payerUsers?.length > 0
      && payeeUser?.length > 0);

  const handlePayeeChange = (userOptions) => {
    const index = userOptions.selectedIndex;
    setPayeeUser(userOptions[index].value);
    setPayeeUserID(users[index]);
  };

  const handlePayerChange = (userOptions) => {
    const userNames = [];
    const userIDs = [];
    for (let i = 0; i < userOptions.length; i += 1) {
      if (userOptions[i].selected) {
        userNames.push(userOptions[i].value);
        userIDs.push(users[i]);
      }
    }
    setPayerUsers(userNames);
    setPayerUserIDs(userIDs);
  };

  return (
    <Modal active={modalState.modalVisible}>
      <Modal.Background onClick={() => onClose()} />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Add Payment</Modal.Card.Title>
          <Delete onClick={() => onClose()} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Content>
            <Field>
              <Label>Payment Name</Label>
              <Control>
                <Input
                  placeholder="Rent"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label>Amount</Label>
              <Control>
                <Input
                  type="number"
                  placeholder="1000"
                  onChange={(e) => setValue(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label>Day of Month</Label>
              <Control>
                <Select.Container fullwidth>
                  <Select
                    onChange={(e) => setDate(monthdays[e.target.options.selectedIndex])}
                  >
                    {monthdays.map((item) => <Select.Option key={item}>{item}</Select.Option>)}
                  </Select>
                </Select.Container>
              </Control>
            </Field>
            <Field>
              <Label>Who is Paying</Label>
              <Control>
                <Select.Container fullwidth>
                  <Select
                    multiple
                    size={2}
                    onChange={(e) => handlePayerChange(e.target.options)}
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
            <Field>
              <Label>Paid To</Label>
              <Control>
                <Select.Container fullwidth>
                  <Select
                    onChange={(e) => handlePayeeChange(e.target.options)}
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
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Container>
            <Button.Group align="centered" size="medium">
              <Button
                disabled={!canBeSubmitted()}
                color="primary"
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
            </Button.Group>
          </Container>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

export default NewPayment;
