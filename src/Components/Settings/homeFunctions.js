import { db } from '../../Shared/firebase';
import uuid from '../../Shared/uuid';

const switchShow = (house, componentName, showState) => {
  const newState = (showState + 1) % 2;
  db.child('houses').child(house.name).child('settings').child(componentName)
    .set(newState);
};

const addQuickItem = (house, name, qty) => {
  const id = uuid();
  const obj = {
    id, name, qty,
  };
  db.child('houses').child(house.name).child('quick-adds').child(id)
    .set(obj);
};

const deleteQuickItem = (house, id) => {
  db.child('houses').child(house.name).child('quick-adds').child(id)
    .remove();
};

export {
  switchShow,
  addQuickItem,
  deleteQuickItem,
};
