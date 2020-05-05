import React, {} from 'react';
import {
  Notification, Tag, Field, Column, Block, Heading, Message,
} from 'rbx';
import {
  dateOffset, prettyDate, isWeekDay, datesEqual,
} from '../../Shared/date';

const Day = ({ date, items }) => (
  <Notification
    color="light"
    style={{ height: '100%', padding: 20 }}
  >
    <Tag
      color={isWeekDay(date) ? 'link' : 'info'}
      size="large"
    >
      <b>{prettyDate(date)}</b>
    </Tag>
    <Block />
    <Field kind="group" multiline>
      {items.length === 0
        ? <Heading style={{ paddingLeft: 2 }}>Nothing to show today.</Heading>
        : items.map((item) => (
          <Message key={item.id} style={{ width: '100%' }} color={item.color}>
            <Message.Header>{item.title}</Message.Header>
            <Message.Body>
              {item.body}
            </Message.Body>
          </Message>
        ))}
    </Field>
  </Notification>
);

const Calendar = ({ firstDay, numberOfDays, items }) => {
  const start = firstDay || new Date();
  const days = numberOfDays || 7;

  return (
    <div>
      <Column.Group style={{ overflowX: 'auto' }} gapSize={2}>
        {[...Array(days).keys()].map((i) => (
          <Column key={i}>
            <Day
              date={dateOffset(start, i)}
              items={items.filter((x) => datesEqual(x.date, dateOffset(start, i)))}
            />
          </Column>
        ))}
      </Column.Group>
    </div>
  );
};

export default Calendar;
