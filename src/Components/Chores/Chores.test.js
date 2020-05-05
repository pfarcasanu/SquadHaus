import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chores from './Chores';

test('Component renders when house is null', () => {
  const { getByTestId } = render(<Chores house={undefined} />);
  expect(getByTestId('chores-tab-btn-calendar').textContent).toBe('Weekly');
  expect(getByTestId('chores-tab-btn-list').textContent).toBe('List');
  expect(getByTestId('chores-add-button').textContent).toBe('Add Chore');
});

test('Filler text visible when there are no chores', () => {
  const { getByTestId } = render(<Chores house={undefined} />);
  fireEvent.click(getByTestId('chores-tab-btn-list'));
  expect(getByTestId('chores-filler-text').textContent).toBe('Add some chores to get started');
});

test('List displays chores', () => {
  const house = {
    chores: {
      0: {
        title: 'Dishes',
        curr: 0,
        cycle: 'weekly',
        frequency: 'Monday',
        id: 0,
        numUsers: 0,
        users: {
          0: 'Shawn Spencer',
        },
      },
    },
  };
  const { getByTestId, getByText } = render(<Chores house={house} />);
  fireEvent.click(getByTestId('chores-tab-btn-list'));
  expect(getByText('Dishes')).toBeTruthy();
});

test('Calendar displays chores', () => {
  const house = {
    chores: {
      0: {
        title: 'Dishes',
        curr: 0,
        cycle: 'weekly',
        frequency: 'Monday',
        id: 0,
        numUsers: 1,
        users: {
          0: 'Shawn Spencer',
        },
      },
    },
  };
  const { getByText } = render(<Chores house={house} />);
  expect(getByText('Dishes')).toBeTruthy();
});
