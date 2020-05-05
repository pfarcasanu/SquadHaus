import React, { useState, useEffect } from 'react';
import Calendar from '../Calendar';
import { dateOffset, weekdays } from '../../Shared/date';

const ChoresCalendar = ({ house, chores, daysAhead }) => {
  const [calendarItems, setCalendarItems] = useState([]);

  // Parse Chores into calendar events
  useEffect(() => {
    const daysAheadArr = [...Array(daysAhead).keys()];
    const today = new Date();
    const items = chores.map((chore) => {
      const choreItems = [];
      let choreCurr = chore.curr;
      daysAheadArr.forEach((i) => {
        const then = dateOffset(today, i);
        if ((chore.cycle === 'weekly' && chore.frequency.includes(weekdays[then.getDay()]))
        || (chore.cycle === 'monthly' && chore.frequency.includes(then.getDate()))) {
          const oldCurr = choreCurr;
          const choreUsers = chore.userIDs && Object.values(chore.userIDs);
          choreCurr = (chore.curr + 1) % chore.numUsers;
          choreItems.push({
            id: chore.id,
            title: chore.title,
            body: chore.users?.[oldCurr],
            date: then,
            color: choreUsers && house.users[choreUsers[oldCurr]].color,
          });
        }
      });
      return choreItems;
    });
    setCalendarItems(items.flat());
  }, [daysAhead, chores, house]);

  return (<Calendar numberOfDays={daysAhead} items={calendarItems} />);
};

export default ChoresCalendar;
