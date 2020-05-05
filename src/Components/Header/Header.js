import React, { } from 'react';
import firebase from 'firebase/app';
import {
  Navbar, Button, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIgloo,
  faSignOutAlt,
  faClipboardList,
  faShoppingBag,
  faPaintRoller,
  faWallet,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import 'firebase/auth';

const Logout = () => (
  <Button
    color="primary"
    onClick={() => firebase.auth().signOut()}
  >
    <span>Log out</span>
    <Icon>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Icon>
  </Button>
);

const Header = ({ user, house }) => (
  <div>
    <Navbar color="info">
      <Navbar.Brand>
        <Navbar.Item href="/#/">
          <Icon size="large">
            <FontAwesomeIcon size="2x" icon={faIgloo} />
          </Icon>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      {user
      && (
      <Navbar.Menu>
        <Navbar.Segment align="start">
          {house?.settings.payments === 1 && (
          <Navbar.Item href="/#/payments/">
            <Icon>
              <FontAwesomeIcon icon={faWallet} />
            </Icon>
            <span>payments</span>
          </Navbar.Item>
          )}
          {house?.settings.chores === 1
          && (
          <Navbar.Item href="/#/chores/">
            <Icon>
              <FontAwesomeIcon icon={faPaintRoller} />
            </Icon>
            <span>chores</span>
          </Navbar.Item>
          )}
          {house?.settings.notes === 1 && (
          <Navbar.Item href="/#/notes/">
            <Icon>
              <FontAwesomeIcon icon={faClipboardList} />
            </Icon>
            <span>notes</span>
          </Navbar.Item>
          )}
          {house?.settings.shopping === 1
          && (
          <Navbar.Item href="/#/shopping/">
            <Icon>
              <FontAwesomeIcon icon={faShoppingBag} />
            </Icon>
            <span>shopping list</span>
          </Navbar.Item>
          )}
        </Navbar.Segment>
        <Navbar.Segment align="end">
          <Navbar.Item href="/#/settings/">
            <Icon>
              <FontAwesomeIcon icon={faCog} />
            </Icon>
            <span>settings</span>
          </Navbar.Item>
          <Navbar.Item>
            {!!user && <Logout />}
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
      )}
    </Navbar>
  </div>
);

export default Header;
