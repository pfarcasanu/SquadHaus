import React, { useState, useEffect } from 'react';
import { Button, Block, Heading } from 'rbx';
import ChoreModal from './ChoreModal';
import Chore from './Chore';
import ChoresCalendar from './ChoresCalendar';

const Chores = ({ house }) => {
  const daysAhead = 7;
  const [chores, setChores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState('calendar');

  const choresList = chores.length === 0
    ? <Heading data-testid="chores-filler-text">Add some chores to get started</Heading>
    : chores.map((x) => <Chore house={house} key={x.id} chore={x} />);

  useEffect(() => {
    const data = house?.chores;
    const items = data ? Object.values(data) : [];
    setChores(items);
  }, [house]);

  return (
    <div style={{ margin: 10 }}>
      <ChoreModal house={house} modalState={{ modalVisible, setModalVisible }} />
      <Button.Group align="left" hasAddons size="medium">
        <Button
          data-testid="chores-tab-btn-calendar"
          color={view === 'calendar' ? 'primary' : ''}
          selected={view === 'calendar'}
          onClick={() => setView('calendar')}
        >
          Weekly
        </Button>
        <Button
          data-testid="chores-tab-btn-list"
          color={view === 'list' ? 'primary' : ''}
          selected={view === 'list'}
          onClick={() => setView('list')}
        >
          List
        </Button>
      </Button.Group>
      {view === 'calendar'
        ? <ChoresCalendar house={house} chores={chores} daysAhead={daysAhead} />
        : choresList}
      <Block />
      <Button.Group align="centered">
        <Button
          data-testid="chores-add-button"
          color="info"
          onClick={() => setModalVisible(true)}
          size="medium"
        >
          Add Chore
        </Button>
      </Button.Group>
    </div>
  );
};

export default Chores;
