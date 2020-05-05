import { db } from '../../Shared/firebase';
import uuid from '../../Shared/uuid';

const addChore = (house, data) => {
  const id = uuid();
  const chore = { id, ...data };
  db.child('houses').child(house.name).child('chores').child(id)
    .set(chore);
};

const deleteChore = (house, id) => {
  db.child('houses').child(house.name).child('chores').child(id)
    .remove();
};

export {
  addChore,
  deleteChore,
};
