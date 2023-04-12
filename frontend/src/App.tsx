import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as fetchAPI from "./network/fetch";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        setNotesLoading(true);
        setShowNotesLoadingError(false);
        const notes = await fetchAPI.fetchNotes();
        setNotes(notes);
      } catch (e) {
        console.error(e);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    getNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await fetchAPI.deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} lg={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            onNoteClicked={setNoteToEdit}
            className={styles.note}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={styles.notesPage}>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        variant="primary"
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add Note
      </Button>

      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Error loading notes...</p>}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>You do not have any notes</p>}</>
      )}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => {
            setShowAddNoteDialog(false);
          }}
          onNoteSaved={(newNote: NoteModel) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => {
            setNoteToEdit(null);
          }}
          onNoteSaved={(updateNote: NoteModel) => {
            setNoteToEdit(null);
            setNotes(
              notes.map((n) => (n._id === updateNote._id ? updateNote : n))
            );
          }}
        />
      )}
    </Container>
  );
}

export default App;
