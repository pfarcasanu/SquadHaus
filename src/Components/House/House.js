import React, { useState } from 'react';
import {
  Modal, Delete, Button, Container, Field, Label, Control, Input, Notification, Radio, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { getHouse, joinHouse, createHouse } from './houseFunctions';
import { key } from '../../Shared/uuid';
import userColors from '../../Shared/color';

const House = ({ create, user, active }) => {
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState();
  const [houseName, setHouseName] = useState();
  const [houseKey, setHouseKey] = useState();
  const [color, setColor] = useState();

  const onCreate = () => {
    getHouse(houseName).then((val) => {
      if (val) {
        setError('This house name is taken already');
        return;
      }
      createHouse(houseName, key().toUpperCase(), user, userName, color);
      active.setHouseModal(false);
    });
  };

  const onJoin = () => {
    getHouse(houseName).then((val) => {
      if (!val || val.key !== houseKey) {
        setError('No house found with this name/key');
        return;
      }
      joinHouse(houseName, houseKey, user, userName, color);
      active.setHouseModal(false);
    });
  };

  const validForm = () => (userName && houseName && color);

  const close = () => {
    active.setHouseModal(false);
    setError(null);
  };

  const onSubmit = () => {
    if (create) onCreate();
    else onJoin();
  };

  return (
    <Modal active={active.houseModal}>
      <Modal.Background onClick={() => close()} />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>
            {create ? 'Create' : 'Join'}
            {' '}
            A House
          </Modal.Card.Title>
          <Delete onClick={() => close()} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field>
            <Label>Your Name</Label>
            <Control>
              <Input
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Chuck Bartowski"
              />
            </Control>
          </Field>
          <Field>
            <Label>House Name</Label>
            <Control>
              <Input
                onChange={(e) => setHouseName(e.target.value.toUpperCase())}
                placeholder="714 Main St"
              />
            </Control>
          </Field>
          {!create
            && (
            <Field>
              <Label>House Key</Label>
              <Control>
                <Input
                  onChange={(e) => setHouseKey(e.target.value.toUpperCase())}
                  placeholder="key-c251-4dce"
                />
              </Control>
            </Field>
            )}
          <Label>Pick a User Color</Label>
          <Control onChange={(e) => setColor(e.target.value)}>
            {userColors.map((c) => (
              <Label key={c}>
                <Radio name="colorOptions" value={c} />
                <Icon color={c}>
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
              </Label>
            ))}
          </Control>
          {error
            && (
            <Notification color="danger">
              {error}
            </Notification>
            )}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Container>
            <Button.Group size="medium" align="centered">
              <Button
                color="primary"
                onClick={() => onSubmit()}
                disabled={!validForm()}
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

export default House;
