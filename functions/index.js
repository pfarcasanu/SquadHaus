/* eslint-disable no-console */

// ===============================================================
//                          Firebase.js
// ===============================================================
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://squad-haus.firebaseio.com',
});

const db = admin.database();

// ===============================================================
//                          Email.js
// ===============================================================
const nodemailer = require('nodemailer');

const sendEmail = (sendAddress, header, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: functions.config().email.user,
      pass: functions.config().email.pass,
    },
  });

  const mailOptions = {
    from: functions.config().email.user,
    to: sendAddress,
    subject: header,
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

// ===============================================================
//                          Date.js
// ===============================================================
const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
};

const getCentralDate = () => {
  const d = new Date();
  const offset = -5;
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * offset));
};

// ===============================================================
//                          Chore.js
// ===============================================================
const incrementChoreCurr = (house, chore) => {
  // Updates the current user who is supposed to do the chore
  const newCurr = (chore.curr + 1) % chore.numUsers;
  db.ref(`houses/${house.name}/chores/${chore.id}`).update({ curr: newCurr });
};

const sendChoreNotification = (users, house, chore) => {
  if (!chore.numUsers) return;
  const date = getCentralDate();
  const day = chore.cycle === 'weekly' ? getDayOfWeek(date) : date.getDate().toString();
  const days = chore.frequency.replace(/\s/g, '').split(',');
  if (days.includes(day)) {
    const userId = chore.userIDs[chore.curr];
    if (!users[userId]) return;
    const userEmail = users[userId].email;
    const userName = chore.users[chore.curr];
    const header = `SquadHaus Reminder: ${chore.title}`;
    let body = '<div>';
    body += `<b>${userName},</b>`;
    body += `<p>This is a reminder from SquadHaus to complete your chore, <b>${chore.title}</b></p>`;
    body += '</div>';
    sendEmail(userEmail, header, body);
    incrementChoreCurr(house, chore);
  }
};

// ===============================================================
//                          Payment.js
// ===============================================================
const sendPaymentNotification = (users, house, payment) => {
  if (!payment.payerIDs || !payment.payeeID) return;
  const date = getCentralDate();
  if (payment.date === date.getDate()) {
    const payerEmails = Object.values(payment.payerIDs).map((id) => users[id] && users[id].email)
      .filter((x) => x);
    const payerNames = Object.values(payment.payers);
    payerEmails.forEach((email, i) => {
      const header = `SquadHaus Reminder: ${payment.title}`;
      let body = '<div>';
      body += `<b>${payerNames[i]},</b>`;
      body += '<p>This is a reminder from SquadHaus to pay ';
      body += `<b>${payment.payee} $${payment.value}</b> for <b>${payment.title}</b>`;
      body += '</p>';
      body += '</div>';
      sendEmail(email, header, body);
    });
  }
};

// ===============================================================
//                          Index.js
// ===============================================================
const sendHouseNotifications = (users, house) => {
  // Chores
  const choreData = house.chores;
  const chores = choreData ? Object.values(choreData) : [];
  chores.forEach((chore) => sendChoreNotification(users, house, chore));

  // Payments
  const paymentData = house.payments;
  const payments = paymentData ? Object.values(paymentData) : [];
  payments.forEach((payment) => sendPaymentNotification(users, house, payment));
};

exports.sendNotifications = functions.https.onRequest((request, response) => {
  const rootRef = db.ref();
  rootRef.once('value')
    .then((snap) => {
      const data = snap.val();
      const { users } = data;
      const housesData = data.houses;
      const housesArr = housesData ? Object.values(housesData) : [];
      housesArr.forEach((house) => sendHouseNotifications(users, house));
    });
  response.status(200).send('success');
});
