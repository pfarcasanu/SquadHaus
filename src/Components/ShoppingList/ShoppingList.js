import React, { useState } from 'react';
import {
  Container, Notification, Box, Field, Control, Input, Button, Delete, Column, Heading,
} from 'rbx';
import { addItem, deleteItem } from './shoppingFunctions';

const ShoppingListForm = ({ house, user }) => {
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState('');

  const onSubmit = () => {
    addItem(house, user, productName, productQty);
    setProductName('');
    setProductQty('');
  };

  return (
    <Box>
      <Field>
        <Control>
          <Input
            placeholder="Item"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Input
            placeholder="Quantity (Optional)"
            onChange={(e) => setProductQty(e.target.value)}
            value={productQty}
          />
        </Control>
      </Field>
      <Button color="primary" onClick={() => onSubmit(house, user, productName, productQty)}>
        Add Item
      </Button>
    </Box>
  );
};

const ShoppingList = ({ house, user }) => {
  const data = house['shopping-list'];
  const items = data ? Object.values(data) : [];

  const quickData = house['quick-adds'];
  const quickItems = quickData ? Object.values(quickData) : [];

  return (
    <Container>
      <Column.Group>
        <Column size={10} offset={1}>
          <Box>
            {items.length === 0
              ? <Heading>Add some items to get started.</Heading>
              : items.map((item) => (
                <Notification color={house.users[item.userID]?.color} key={item.id}>
                  <Delete onClick={() => deleteItem(house, item.id)} />
                  <Heading>
                    {item.name}
                    {item.qty && ` (${item.qty})`}
                  </Heading>
                </Notification>
              ))}
          </Box>
          <Column.Group>
            <Column>
              <ShoppingListForm house={house} user={user} />
            </Column>
            <Column>
              <Box>
                <Button.Group align="left">
                  {quickItems.length === 0
                    ? (
                      <Heading>
                        To get started with quick-add items, visit the
                        {' '}
                        <a href="/#/settings">Settings</a>
                        {' '}
                        tab
                      </Heading>
                    )
                    : quickItems.map((item) => (
                      <Button
                        color="primary"
                        onClick={() => addItem(house, user, item.name, item.qty)}
                      >
                        <span>{item.name}</span>
                      </Button>
                    ))}
                </Button.Group>
              </Box>
            </Column>
          </Column.Group>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default ShoppingList;
