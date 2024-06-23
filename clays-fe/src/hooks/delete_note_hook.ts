import { useMutation, useQueryClient } from 'react-query';
import { NotesService } from '../services/notes_service';

const notesService = new NotesService();

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await notesService.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};
