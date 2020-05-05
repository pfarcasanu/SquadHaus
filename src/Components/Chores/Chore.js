import React from 'react';
import {
  Notification, Tag, Field, Control, Delete,
} from 'rbx';
import { deleteChore } from './choresFunctions';

const Chore = ({ house, chore }) => (
  <Notification color="light">
    <Delete onClick={() => deleteChore(house, chore.id)} />
    <Tag.Group size="large">
      <Tag color="info"><b>{chore.title}</b></Tag>
    </Tag.Group>
    <Field kind="group" multiline>
      <Control>
        <Tag.Group gapless size="medium">
          <Tag color="dark">cycle</Tag>
          <Tag color="success">{chore.cycle}</Tag>
        </Tag.Group>
      </Control>
      <Control>
        <Tag.Group gapless size="medium">
          <Tag color="dark">day</Tag>
          <Tag color="warning">{chore.frequency}</Tag>
        </Tag.Group>
      </Control>
    </Field>
    <Tag.Group>
      {chore.users && Object.keys(chore.users).map((key) => (
        <Tag key={key} color={key === chore.curr.toString() ? 'primary' : 'white'} size="medium">
          {chore.users[key]}
        </Tag>
      ))}
    </Tag.Group>
  </Notification>
);

export default Chore;
