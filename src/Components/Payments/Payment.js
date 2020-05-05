import React from 'react';
import {
  Notification, Tag, Field, Control, Delete,
} from 'rbx';
import { deletePayment } from './paymentsFunctions';

const Payment = ({ house, payment, highlighted }) => {
  const payers = payment.payers ? Object.values(payment.payers) : [];
  const payerIDs = payment.payers ? Object.values(payment.payerIDs) : [];

  return (
    <Notification color={highlighted ? 'info' : 'light'}>
      <Delete onClick={() => deletePayment(house, payment.id)} />
      <Tag.Group>
        <Tag size="large" color={highlighted ? 'light' : 'info'}>{payment.title}</Tag>
      </Tag.Group>
      <Field kind="group" multiline>
        <Control>
          <Tag.Group size="medium" gapless>
            <Tag color="dark">Amount</Tag>
            <Tag color="success">{payment.value}</Tag>
          </Tag.Group>
        </Control>
        <Control>
          <Tag.Group size="medium" gapless>
            <Tag color="dark">Pay To</Tag>
            <Tag color="warning">{payment.payee}</Tag>
          </Tag.Group>
        </Control>
      </Field>
      <Tag.Group size="medium">
        {payers.map((name, i) => <Tag color="primary" key={payerIDs[i]}>{name}</Tag>)}
      </Tag.Group>
    </Notification>
  );
};

export default Payment;
