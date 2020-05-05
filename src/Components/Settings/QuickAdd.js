import React, { useState } from 'react';
import {
  Container, Column, Heading, Box, Button, Notification, Delete, Input, Control, Field, Block,
} from 'rbx';
import { deleteQuickItem, addQuickItem } from './homeFunctions';

const QuickForm = ({ house }) => {
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState('');

  return (
    <div>
      <Field>
        <Control>
          <Input
            placeholder="Quick-Add Item"
            onChange={(e) => setProductName(e.target.value)}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Input
            placeholder="Quantity (Optional)"
            onChange={(e) => setProductQty(e.target.value)}
          />
        </Control>
      </Field>
      <Button color="primary" onClick={() => addQuickItem(house, productName, productQty)}>
        Add Quick-Add Item
      </Button>
    </div>
  );
};

const QuickAdd = ({ house }) => {
  const quickData = house['quick-adds'];
  const items = quickData ? Object.values(quickData) : [];

  return (
    <Container>
      <Column.Group>
        <Column size={8} offset={2}>
          <Box>
            {items.length === 0
              ? <Heading>Add some quick-add items. These will appear in Shopping List</Heading>
              : items.map((item) => (
                <Notification color="primary" key={item.id}>
                  <Delete onClick={() => deleteQuickItem(house, item.id)} />
                  <Heading>
                    {item.name}
                    {item.qty && ` (${item.qty})`}
                  </Heading>
                </Notification>
              ))}
            <Block />
            <QuickForm house={house} />
          </Box>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default QuickAdd;
