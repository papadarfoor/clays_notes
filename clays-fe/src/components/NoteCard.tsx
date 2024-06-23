import React, { useState } from 'react';
import { useEditNote } from '../hooks/edit_note_hook';
import { useDeleteNote } from '../hooks/delete_note_hook';
import { Note } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [, setIsDialogOpen] = useState(false); 
  const [editedNote, setEditedNote] = useState(note);

  const editNote = useEditNote();
  const deleteNote = useDeleteNote();

  const handleEdit = () => {
    editNote.mutate(editedNote, {
      onSuccess: () => {
        setIsEditing(false);
        setEditedNote({
          id: note.id,
          title: editedNote.title,
          content: editedNote.content,
        });
      },
    });
  };

  const handleDelete = () => {
    deleteNote.mutate(note.id);
  };

  const handleView = () => {
    setIsDialogOpen(true);
  };


  return (
    <Card className="p-4 border rounded shadow">
      {isEditing ? (
        <div>
          <input 
            className="w-full mb-2 px-3 py-2 border rounded"
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea 
            className="w-full mb-2 px-3 py-2 border rounded"
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          />
          <Button onClick={handleEdit} className="mr-2">Save</Button>
          <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.content}</p>
          <Button onClick={() => setIsEditing(true)} variant="outline" className="mr-2">Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Dialog >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{note.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {note.content}
              </DialogDescription>
            </DialogContent>

            <DialogTrigger>
            <Button onClick={handleView} variant="secondary">View</Button> 
          </DialogTrigger>
          </Dialog>
         
        </div>
      )}
    </Card>
  );
};

export default NoteCard;
