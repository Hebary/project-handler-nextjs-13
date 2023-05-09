export interface Task {
    name: string;
    description: string;
    priority: string;
    deliveryDate: string;
    project: string;
    state: boolean;
    completed:{ name:string, _id:string };
    _id?: string;
}