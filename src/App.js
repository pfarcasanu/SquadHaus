import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Block, Notification } from 'rbx';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'rbx/index.css';
import Notes from './Components/Notes';
import Header from './Components/Header';
import Home from './Components/Home';
import ShoppingList from './Components/ShoppingList';
import Chores from './Components/Chores';
import Payments from './Components/Payments';
import Settings from './Components/Settings';
import Loading from './Components/Loading';
import { db } from './Shared/firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const Greeting = () => (
  <div style={{ padding: 40 }}>
    <Notification color="white">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Notification>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [house, setHouse] = useState(null);
  const [signingIn, setSigningIn] = useState(false);

  const home = <Home house={house} user={user} />;

  const stopLoading = (error = undefined) => {
    // eslint-disable-next-line no-console
    if (error) console.error(error);
    setTimeout(() => setLoading(false), 100);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    setSigningIn(false);
  }, [user]);

  useEffect(() => {
    const handleData = (snap) => {
      const houseName = snap.val()?.users?.[user?.uid]?.house;
      if (houseName) {
        setHouse(snap.val().houses[houseName]);
      } else {
        setHouse(null);
      }
      stopLoading();
    };
    db.on('value', handleData, (error) => stopLoading(error));
    return () => { db.off('value', handleData); };
  }, [user]);

  if (loading) return <Loading />;

  return (
    <HashRouter>
      <Header user={user} signIn={{ signingIn, setSigningIn }} house={house} />
      {!user
        ? <Greeting />
        : (
          <div style={{ padding: 10 }}>
            <Block />
            <Switch>
              <Route exact path="/payments">
                {house ? <Payments house={house} /> : home}
              </Route>
              <Route exact path="/chores/">
                {house ? <Chores house={house} /> : home}
              </Route>
              <Route exact path="/notes/">
                {house ? <Notes house={house} user={user} /> : home}
              </Route>
              <Route exact path="/shopping/">
                {house ? <ShoppingList house={house} user={user} /> : home}
              </Route>
              <Route exact path="/settings/">
                {house ? <Settings house={house} /> : home}
              </Route>
              <Route path="/">
                {home}
              </Route>
            </Switch>
          </div>
        )}
    </HashRouter>
  );
};

export default App;
