import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput } from "../network/fetch";
import * as fetchAPI from "../network/fetch";

const AddEditNoteDialog = ({
  onDismiss,
  onNoteSaved,
  noteToEdit,
}: {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
  noteToEdit?: Note;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse;
      if (noteToEdit) {
        noteResponse = await fetchAPI.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await fetchAPI.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: true })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.text?.message}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
