import React from 'react';
import {
  Container, Column, Heading, Box, Button, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { switchShow } from './homeFunctions';

const PageSettings = ({ house }) => {
  const settingNames = ['payments', 'chores', 'notes', 'shopping'];

  return (
    <Container>
      <Column.Group>
        <Column size={8} offset={2}>
          <Box>
            {
              settingNames.map((item) => (
                <div key={item}>
                  <Heading>
                    {item}
                  </Heading>
                  <Button.Group hasAddons>
                    <Button
                      color={house.settings[item] === 1 ? 'primary' : null}
                      onClick={() => switchShow(house, item, house.settings[item])}
                    >
                      <Icon size="small">
                        <FontAwesomeIcon icon={faEye} />
                      </Icon>
                      <span>Show</span>
                    </Button>
                    <Button
                      color={house.settings[item] === 0 ? 'primary' : null}
                      onClick={() => switchShow(house, item, house.settings[item])}
                    >
                      <Icon size="small">
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </Icon>
                      <span>Hide</span>
                    </Button>
                  </Button.Group>
                </div>
              ))
            }
          </Box>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default PageSettings;
