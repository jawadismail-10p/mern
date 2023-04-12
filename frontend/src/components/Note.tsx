import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils";

const Note = ({ note, className }: { note: NoteModel; className?: string }) => {
  let timestampText: string;

  if (note.updatedAt > note.createdAt) {
    timestampText = "Updated:" + formatDate(note.updatedAt);
  } else {
    timestampText = "Created:" + formatDate(note.createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{timestampText || ""}</Card.Footer>
    </Card>
  );
};

export default Note;
