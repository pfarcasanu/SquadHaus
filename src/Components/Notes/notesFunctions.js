import { db } from '../../Shared/firebase';
import uuid from '../../Shared/uuid';

const deleteNote = (house, id) => {
  db.child('houses').child(house.name).child('notes').child(id)
    .remove();
};

const addNote = (house, user, header, body) => {
  const id = uuid();
  const note = {
    id,
    header,
    body,
    userID: user.uid,
  };
  db.child('houses').child(house.name).child('notes').child(id)
    .set(note);
};

export {
  deleteNote,
  addNote,
};
