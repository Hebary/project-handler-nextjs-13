import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { grey } from "@mui/material/colors";

import { useProjects } from '@/hooks';
import { Layout } from "../components/layout"
import { Project } from "../components/projects"
import { FullScreenLoading } from '@/components/ui';


export const IndexPage: NextPage = () => {

   const { projects } = useProjects();
   const [ loading, setLoading ] = useState(true);

   useEffect(() => {
      setTimeout(() => setLoading(false), 3000);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   

   return (
      <Layout>
               {  
               loading ? <FullScreenLoading/> : 
                  <>
                    <Typography variant='h4' sx={{ mt:1, textTransform:'capitalize', fontWeight:300}} className='red-hat-font'>All projects</Typography>
                    <Grid container display='flex' mt={2} flexDirection='column' className='fadeInUp' >
                     {  projects.length ? projects.map( project =>
                           <Project key={project._id} project={project} />
                        )
                        : 
                        (  
                           <Grid sx={{ my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[300] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                              <Typography variant='body1' sx={{fontWeight:300}} className='red-hat-font'>You don&apos;t have any projects yet</Typography>
                           </Grid>
                        )
                     }
                     </Grid> 
                  </>
               }
      </Layout>
   )
}
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

 
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//    const { token = "" } = req.cookies;
//    if(!token){ 
//       return {
//          redirect:{
//             destination: '/auth/login',
//             permanent: false
//          }
//       }
//    } 

//    const config = {
//       headers: {
//           'Content-Type' : 'application/json',
//           'Authorization': `Bearer ${token}`
//       }
//    }

//    try {
//       const { data } = await pmApi.get<IProject[]>('/projects', config); 
//       const projects = data;
//       return {
//          props: {
//             projects
//          }
//       }
//    } catch(err) {
//       if(err){
//          return {
//             redirect:{
//                destination: '/',
//                permanent: false
//             }
//          }
//       }
//    }

//    return {
//       redirect: {
//          destination: '/',
//          permanent: false
//       }
//    }
// }

export default IndexPage