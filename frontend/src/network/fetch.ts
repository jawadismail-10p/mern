import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.ok) {
    return res;
  } else {
    const errBody = await res.json();
    const errorMessage = errBody.error;
    throw new Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData('/api/notes', {method: 'GET'})
  return res.json();
}

export interface NoteInput { 
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData('/api/notes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(note)
  });
  return res.json();
}