export class NotesModel {
    id: number;
    title: string;
    content: string;

    constructor(data:Record<string, any>) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
    }
}
