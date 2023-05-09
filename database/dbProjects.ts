import { db } from '.';
import { Project as IProject } from '@/interfaces';
import { Project } from '@/models';

interface ProductSlug {
    slug: string;
}


export const  getProductBySlug = async(slug: string): Promise<Project | null> => {
        await db.connect();
        const project = await Project.findOne({ slug })
            .lean();
        await db.disconnect();
        if(!Project) return null;
    
        return JSON.parse(JSON.stringify( Project ));
    }

    export const getAllProductSlugs = async(): Promise<Project[]> => {
        await db.connect();
        const slugs = await Project.find()
            .select( 'slug -_id' )
            .lean();
        await db.disconnect();
        return slugs 
    }

    export const getProductsBySearch = async(search: string): Promise<Project[]> => {
        await db.connect();
        const projects = await Project.find({ $text: { $search: search } })
            .select( '-_id')
            .lean();
        await db.disconnect();


        return  JSON.parse(JSON.stringify(projects));
    }

    export const getAllProducts = async(): Promise<Project[]> => {
        await db.connect();
        const projects = await Project.find()
            .select( '-_id')
            .lean();
        await db.disconnect();


        return  JSON.parse(JSON.stringify(projects));
    }

