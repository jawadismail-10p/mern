import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import styles from './styles/NotesPage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await res.json();
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
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
