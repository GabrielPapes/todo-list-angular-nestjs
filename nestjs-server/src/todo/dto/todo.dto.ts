export class TodoDTO {
    title: string;
    description: string;
    status: 'todo' | 'done' | 'progress';
    creationDate: Date;
    startDate: Date;
    endDate: Date;
}