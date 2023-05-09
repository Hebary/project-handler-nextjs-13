import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { grey } from "@mui/material/colors";
import { Layout } from "../../components/layout"
// import { useProjects } from "../../hooks";
import { Project } from "../../components/projects"


export const Projects: NextPage = () => {

   // const { projects } = useProjects();
   return (
        <Layout>
           <Typography variant='h4' sx={{ mt:1, textTransform:'capitalize', fontWeight:300}} className='red-hat-font'>All projects</Typography>
           <Grid container display='flex' mt={2} flexDirection='column' className='fadeInUp' >
{/* 
            {  projects.length ? projects.map( project =>
                  <Project key={project._id} project={project} />
               )
               : 
               (  
                  <Grid sx={{ my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[300] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                     <Typography variant='body1' sx={{fontWeight:300}} className='red-hat-font'>You don&apos;t have any projects yet</Typography>
                  </Grid>
               )
            } */}
            </Grid> 
        </Layout>
    )
}
