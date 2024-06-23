import { useMutation, useQueryClient } from 'react-query';
import { NotesService } from '../services/notes_service';

const notesService = new NotesService();

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteData: { title: string; content: string }) => {
      return await notesService.createNote(noteData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};
