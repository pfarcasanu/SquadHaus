import React from 'react';
import { Column, Block } from 'rbx';
import PageSettings from './PageSettings';
import QuickAdd from './QuickAdd';

const Settings = ({ house }) => (
  <Column size={6} offset={3}>
    {house && <PageSettings house={house} />}
    <Block />
    {house && <QuickAdd house={house} />}
  </Column>
);

export default Settings;
