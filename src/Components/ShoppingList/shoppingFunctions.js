import { db } from '../../Shared/firebase';
import uuid from '../../Shared/uuid';

const addItem = (house, user, name, qty) => {
  const id = uuid();
  const obj = {
    id, name, qty, userID: user.uid,
  };
  db.child('houses').child(house.name).child('shopping-list').child(id)
    .set(obj);
};

const deleteItem = (house, id) => {
  db.child('houses').child(house.name).child('shopping-list').child(id)
    .remove();
};

export {
  addItem,
  deleteItem,
};
