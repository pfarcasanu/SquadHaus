import React, { useState } from 'react';
import {
  Box, Notification, Heading, Delete, Control, Input, Column, Field, Button,
} from 'rbx';
import Grid from '@material-ui/core/Grid';
import { deleteNote, addNote } from './notesFunctions';

const NotesForm = ({ house, user }) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    addNote(house, user, header, body);
    setHeader('');
    setBody('');
  };

  return (
    <Box>
      <Field>
        <Control>
          <Input placeholder="Note Header" onChange={(e) => setHeader(e.target.value)} value={header} />
        </Control>
      </Field>
      <Field>
        <Control>
          <Input placeholder="Note Body" onChange={(e) => setBody(e.target.value)} value={body} />
        </Control>
      </Field>
      <Field>
        <Control>
          <Button color="primary" onClick={handleSubmit}>Add Note</Button>
        </Control>
      </Field>
    </Box>
  );
};

const Note = ({ house, note }) => (
  <Notification color={house.users[note.userID]?.color} size="big">
    <Delete as="button" onClick={() => deleteNote(house, note.id)} />
    <Heading>
      {note.header}
    </Heading>
    {note.body}
  </Notification>
);

const Notes = ({ house, user }) => {
  const data = house.notes;
  const notes = data ? Object.values(data) : [];

  return (
    <Column.Group>
      <Column size={10} offset={1}>
        <Box>
          {notes.length === 0 ? <Heading>Add some notes to get started.</Heading> : (
            <Grid container spacing={2}>
              {notes.map((note) => (
                <Grid item key={note.id}>
                  <Note house={house} note={note} className="two wide column" />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <NotesForm house={house} user={user} />
      </Column>
    </Column.Group>
  );
};

export default Notes;
