import { useMutation, useQueryClient } from 'react-query';
import { NotesService } from '../services/notes_service';

const notesService = new NotesService();

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote: { id: number; title: string; content: string }) => {
      return await notesService.editNote(updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};
