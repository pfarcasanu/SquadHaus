import { db } from '../../Shared/firebase';
import uuid from '../../Shared/uuid';

const addPayment = (house, data) => {
  const id = uuid();
  const payment = { id, ...data };
  db.child('houses').child(house.name).child('payments').child(id)
    .set(payment);
};

const deletePayment = (house, id) => {
  db.child('houses').child(house.name).child('payments').child(id)
    .remove();
};

export {
  addPayment,
  deletePayment,
};
