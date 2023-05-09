import mongoose, { Schema, model, Model} from 'mongoose';
import { Project } from '../interfaces';


const ProjectSchema = new Schema({
    name        :{ type: String, trim: true, required: true },
    description :{ type: String, trim: true, required: true },
    deliveryDate:{ type: String, trim: true, default: Date.now() },
    client      :{ type: String, trim: true, required: true },
    creator     :{ type: mongoose.Schema.Types.ObjectId, ref:'User'},
    contributors:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    tasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
   
  },{
    timestamps: true
});

ProjectSchema.index({ name: 'text', description: 'text' });

const Project: Model<Project> = mongoose.models.Project || model<Project>('Project', ProjectSchema);

export default Project;