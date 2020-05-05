import React from 'react';
import {
  Box, Tag, Heading,
} from 'rbx';

const Roommates = ({ house }) => {
  const users = house?.users;
  const userKeys = users ? Object.keys(users) : [];

  return (
    <Box>
      <Heading as="b">Roommates</Heading>
      <Tag.Group size="medium">
        {userKeys.map((key) => (
          <Tag
            key={key}
            color={users[key].color}
          >
            {users[key].name}
          </Tag>
        ))}
      </Tag.Group>
    </Box>
  );
};

export default Roommates;
