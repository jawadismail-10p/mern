import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils";
import { MdDelete } from "react-icons/md";

const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
  className,
}: {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}) => {
  let timestampText: string;

  if (note.updatedAt > note.createdAt) {
    timestampText = "Updated:" + formatDate(note.updatedAt);
  } else {
    timestampText = "Created:" + formatDate(note.createdAt);
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => {
        onNoteClicked(note);
      }}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {note.title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{timestampText || ""}</Card.Footer>
    </Card>
  );
};

export default Note;
