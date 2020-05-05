import React from 'react';
import {
  Heading, Button, Icon, Block, Box,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { leaveHouse } from '../House/houseFunctions';

const HouseSettings = ({ house, user, setters }) => {
  const createClick = () => {
    setters.setCreate(true);
    setters.setHouseModal(true);
  };

  const joinClick = () => {
    setters.setCreate(false);
    setters.setHouseModal(true);
  };

  return (
    <Box>
      {!house
        ? (
          <div>
            <Heading>join a house to get started</Heading>
            <Block />
            <Button.Group align="centered">
              <Button color="primary" onClick={() => joinClick()}>
                <Icon>
                  <FontAwesomeIcon icon={faUsers} />
                </Icon>
                <span>Join House</span>
              </Button>
              <Button color="primary" onClick={() => createClick(true)}>
                <Icon>
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
                <span>Create House</span>
              </Button>
            </Button.Group>
          </div>
        )
        : (
          <div>
            <Heading>
              <b>House name:</b>
              {' '}
              {house.name}
            </Heading>
            <Heading>
              <b>House key:</b>
              {' '}
              {house.key}
            </Heading>
            <Block />
            <Button.Group align="centered">
              <Button color="primary" onClick={() => leaveHouse(house.name, user)}>
                <Icon>
                  <FontAwesomeIcon icon={faDoorOpen} />
                </Icon>
                <span>Leave House</span>
              </Button>
            </Button.Group>
          </div>
        )}
    </Box>
  );
};

export default HouseSettings;
