import api from '../api';
import { NotesModel } from '../models/notes_model';


export class NotesService {

  async fetchNotes():Promise<NotesModel[]> {
    const response = await api.get('/notes');
    return response.data.map((element:Record<string,any>)=>new NotesModel(element));
  };

  async fetchNoteById(id: number):Promise<NotesModel> {
    const response = await api.get(`/notes/${id}`);
    return new NotesModel(response.data);
  };

  async createNote(noteData: { title: string; content: string }): Promise<NotesModel> {
    const response = await api.post('/notes', noteData);
    return new NotesModel(response.data);
  }

  async editNote(id: number, noteData: { title: string; content: string }): Promise<NotesModel> {
    const response = await api.put(`/notes/${id}`, noteData);
    return new NotesModel(response.data);
  }
  async deleteNote(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  }
}

