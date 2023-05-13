import { useState } from 'react';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, TextField, Typography, Input } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { Layout } from '../../../components/layout';
import { useProjects } from '../../../hooks';
import { Project } from '../../../interfaces';
import { NextPage } from 'next';

type FormData = {
    name       : string;
    client     : string;
    description: string;
    deliveryDate: string;
}

const NewProject: NextPage = () => {
    const { createProject } = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ alert, setAlert ] = useState(false);
    
    const router = useRouter();

    const onCreateProject = async (projectData: FormData) => {
        createProject(projectData as Project);
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
            router.push('/');
        }, 1500);
    }

    return (
        <Layout title='New Project'>
            <Box maxWidth={'330px'} display={'flex'} flexWrap={'wrap'} className='fadeInUp' m='20px auto 0'>
                <Typography color='info.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ letterSpacing:1, fontWeight:300, textTransform:'capitalize' }}>New</Typography>
                <Typography color='primary.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:1, fontWeight:900, textTransform:'capitalize' }}>Project</Typography>
            </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onCreateProject) }>
                <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                <Chip
                                    label='Project succesfully created'
                                    color='success'
                                    className='fadeInUp'
                                    icon= {< CheckCircleOutline/>}
                                    variant='outlined'
                                    sx={{ display: alert ? 'flex' : 'none' , mt: 1 }}
                                />

                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    {...register('name',{
                                        required: 'Name is required',
                                        minLength: {
                                            value: 3, message:'Name must be at least 3 characters'
                                        }
                                    })}
                                    error={ !!errors.name }
                                    helperText={errors.name?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Name' />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    {...register('client',{
                                        required: 'Client is required',
                                        minLength: {
                                            value: 3, message:'Client must be at least 3 characters'
                                        }
                                    })}
                                    error={ !!errors.client }
                                    helperText={errors.client?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Client' />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    sx={{mb: 2}}
                                    multiline
                                    rows={3}
                                    fullWidth
                                    {...register('description',{
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10, message:'Description must be at least 10 characters'
                                        }
                                    })} 
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    variant='filled' 
                                    label='Description' 
                                />

                                <Input 
                                    type='date'
                                    fullWidth
                                    sx={{my:'2px', py:2, px:1}} 
                                    {...register('deliveryDate',{
                                        required: 'Deliver Date is required',
                                    }
                                )}
                                    error={!!errors.deliveryDate}
                                    
                                />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth className='circular-btn' size='large' >
                                    Create Project
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </form>
        </Layout>
    )
}

export default NewProject;