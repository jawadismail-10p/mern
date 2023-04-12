import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import styles from "./styles/NotesPage.module.css";
import * as fetchAPI from "./network/fetch";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await fetchAPI.fetchNotes();
        setNotes(notes);
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }
    getNotes();
  }, []);

  return (
    <Container>
      <Button className="mb-4" variant="primary" onClick={() => setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => {
            setShowAddNoteDialog(false);
          }}
          onNoteSaved={(newNote: NoteModel) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
