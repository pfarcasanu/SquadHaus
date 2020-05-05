import React, { useState } from 'react';
import { Column } from 'rbx';
import House from '../House';
import HouseSettings from './HouseSettings';
import Roommates from './Roommates';

const Home = ({ user, house }) => {
  const [create, setCreate] = useState(true);
  const [houseModal, setHouseModal] = useState(false);

  return (
    <Column size={6} offset={3}>
      <House
        active={{ houseModal, setHouseModal }}
        create={create}
        user={user}
      />
      <HouseSettings user={user} house={house} setters={{ setCreate, setHouseModal }} />
      {house && <Roommates house={house} />}
    </Column>
  );
};

export default Home;
