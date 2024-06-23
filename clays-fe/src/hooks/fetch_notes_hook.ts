import { useQuery } from "react-query";
import { NotesService } from "../services/notes_service";

const notesService: NotesService = new NotesService();

export const useGetNotes = () => { return useQuery({ queryKey: ['notes'], queryFn: async () => { return await notesService.fetchNotes(); } }) }

export const useGetNoteById = (id: number) => useQuery(['note', id], () => notesService.fetchNoteById(id));
