import { db } from '../../Shared/firebase';

const getHouse : Promise = (houseName) => db.child('houses').child(houseName)
  .once('value').then((snap) => snap.val());

const createHouse = (houseName, houseKey, user, userName, userColor) => {
  const userData = {};
  userData[user.uid] = {
    name: userName,
    color: userColor,
  };
  const data = {
    name: houseName,
    key: houseKey,
    users: userData,
    settings: {
      payments: 1,
      chores: 1,
      notes: 1,
      shopping: 1,
    },
  };
  db.child('houses').child(houseName).set(data);
  db.child('users').child(user.uid).set({ house: houseName, email: user.email });
};

const joinHouse = (houseName, houseKey, user, userName, userColor) => {
  const userData = {};
  userData[user.uid] = {
    name: userName,
    color: userColor,
  };
  db.child('houses').child(houseName).child('users').update(userData);
  db.child('users').child(user.uid).set({
    house: houseName,
    email: user.email,
  });
};

const leaveHouse = (houseName, user) => {
  db.child('houses').child(houseName).child('users').child(user.uid)
    .remove();
  db.child('users').child(user.uid).set(null);
};

export {
  getHouse,
  createHouse,
  joinHouse,
  leaveHouse,
};
