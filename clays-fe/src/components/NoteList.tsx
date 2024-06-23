import NoteCard from './NoteCard';
import { NotesModel } from '../models/notes_model';

interface NoteItems {
  notes: NotesModel[];
}

const NoteList: React.FC<NoteItems> = ({ notes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note: NotesModel) => (
        <div key={note.id}>
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
