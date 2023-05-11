import { useState } from 'react';
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { Box, Button, Chip, FormControl, Grid, TextField, Typography } from "@mui/material"
import { CheckCircleOutline } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Layout } from "../../components/layout"
// import { useProjects } from "../../hooks";
import { User } from "../../interfaces";
import { validator } from '../../utils/isValidEmail';

type FormData = {
    email:string;
}

 const NewContributor: React.FC = () => {
    
    // const { findContributor, contributor, addContributor, project } = useProjects();
    const { handleSubmit, register, formState:{errors} } = useForm<FormData>()
    
    const [alert, setAlert] = useState(false);
    const router = useRouter();
    // const onSubmitContributor = ({ email }: FormData) => {
    //     findContributor(email);
    // }

    // const onAddContributor = async () => {
    //     addContributor(contributor?.email as string);
    //     setAlert(true);
    //     setTimeout(() => {
    //         setAlert(false)
    //         router.push(`/projects/${project?._id}`);
    //     }, 1500);
    // }

    return (
        <Layout>
            <Box maxWidth={'300px'} display={'flex'} className='fadeInUp' m='40px auto 0'>
                <Typography color='info.main' variant='h4' component='h2' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>New</Typography>
                <Typography color='primary.main' variant='h4' component='h2' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Contributor</Typography>
            </Box>
            <Grid item xs={ 12 } maxWidth='320px' m='10px auto'>
                                
                <Chip
                    label='contributor succesfully added'
                    color='success'
                    className='fadeInUp'
                    icon= {< CheckCircleOutline/>}
                    variant='outlined'
                    sx={{ display: alert ? 'flex' : 'none' , mt: 1 }}
                    />
            
            </Grid>
            <Grid sx={{ maxWidth:'420px', mb:4, mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                {/* <form onSubmit={handleSubmit(onSubmitContributor)}> */}
                    <FormControl fullWidth>
                        <TextField
                            label='Email'
                            {...register('email',{
                                required: 'Email is required',
                                validate:validator.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={errors?.email?.message as string}
                        />
                        <Button type='submit' color='info' sx={{ mt:2 }} variant='contained' fullWidth size='large' >Search</Button>
                    </FormControl>
                {/* </form> */}
            </Grid>
             {/* { contributor as User && ( */}
                <Grid sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:1, mb:2, borderRadius:3, p:3, mx:4, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[100] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                    <Typography color='info.main' variant='body1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>{'contributor'}</Typography>
                    <Button type='submit' color='info' variant='contained' onClick={()=>'add contriburor'} size='small' >Add to project</Button>
                </Grid> 
                {/* ) */}
            {/* } */}
        </Layout>
    )
}
export default NewContributor;