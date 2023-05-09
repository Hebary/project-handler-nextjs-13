import mongoose, { Schema, model, Model} from 'mongoose';
import { Task } from '../interfaces';


const TaskSchema = new Schema({
    name:{ type: String, required: true, trim: true, },
    description:{ type:String, trim:true, required:true, },
    state:{ type:Boolean, default:false, },
    deliveryDate :{ type:String, trim: true, default: Date.now() },
    priority:{ type:String, required:true, enum:["Low","Medium","High"], },
    project:{ type: mongoose.Schema.Types.ObjectId, ref:'Project', },
    completed:{ type: mongoose.Schema.Types.ObjectId, ref:'User', },
  },{
    timestamps: true
});

TaskSchema.index({ name: 'text', description: 'text' });

const Project: Model<Task> = mongoose.models.Project || model<Task>('Task', TaskSchema);

export default Project;