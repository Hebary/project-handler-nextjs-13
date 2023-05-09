import { Task, User } from ".";

export interface Project {
    _id        ?: string;
    name        : string;
    description : string;
    deliveryDate: string;
    client      : string;
    tasks       : Task[];
    contributors: User[];
    creator     : User["_id"];
}

