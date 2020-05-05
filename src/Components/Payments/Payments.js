import React, { useState, useEffect } from 'react';
import {
  Button, Block, Container, Heading,
} from 'rbx';
import './payments.css';
import CalendarMonthView from 'react-calendar-month-view';
import NewPayment from './PaymentModal';
import Payment from './Payment';

const Payments = ({ house }) => {
  const [payments, setPayments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState('list');
  const [highlighted, setHighlighted] = useState();

  const viewInList = (id) => {
    setHighlighted(id);
    setView('list');
  };

  const switchView = () => {
    setHighlighted(undefined);
    if (view === 'calendar') setView('list');
    else setView('calendar');
  };

  const renderDay = (isoDate, smallCalendar) => {
    const date = new Date(isoDate);
    const paymentsToday = payments.filter((x) => x.date === date.getDate());
    if (paymentsToday.length === 0) return <div />;
    const payment = paymentsToday[0];
    return (
      <Button
        color={house.users[payment.payeeID].color}
        style={{ width: '100%', height: '100%' }}
        onClick={() => viewInList(payment.id)}
      >
        {!smallCalendar && payment.title[0].toUpperCase()}
      </Button>
    );
  };

  const paymentsList = payments.length === 0
    ? <Heading>Add some payments to get started</Heading>
    : payments.map((data) => (
      <Payment
        house={house}
        key={data.id}
        payment={data}
        highlighted={highlighted === data.id}
      />
    ));

  useEffect(() => {
    const data = house?.payments;
    if (data) setPayments(Object.values(data));
    else setPayments([]);
  }, [house]);

  return (
    <div style={{ margin: 10 }}>
      <NewPayment house={house} modalState={{ modalVisible, setModalVisible }} />
      <Button.Group align="left" hasAddons size="medium">
        <Button
          color={view === 'calendar' ? 'primary' : ''}
          selected={view === 'calendar'}
          onClick={() => switchView()}
        >
          Monthly
        </Button>
        <Button
          color={view === 'list' ? 'primary' : ''}
          selected={view === 'list'}
          onClick={() => switchView()}
        >
          List
        </Button>
      </Button.Group>
      {view === 'calendar'
        ? (
          <Container>
            <CalendarMonthView width="100%" renderDay={renderDay} />
          </Container>
        )
        : paymentsList}
      <Block />
      <Button.Group align="centered" size="medium">
        <Button color="info" onClick={() => setModalVisible(true)}>
          Add Payment
        </Button>
      </Button.Group>
    </div>
  );
};

export default Payments;
