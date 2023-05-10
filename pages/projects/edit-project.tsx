import { useState } from 'react';
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { Box, Button, Chip, Grid, IconButton, Input, TextField, Typography } from "@mui/material"
import { CheckCircleOutline, DeleteOutlineRounded } from "@mui/icons-material"
import { Layout } from "../../components/layout"
// import { useProjects } from '../../hooks';
import { Project } from '../../interfaces';
import { NextPage } from 'next';

type FormData = {
    name        : string;
    description : string;
    client      : string;
    deliveryDate: string;
}

const EditProject : NextPage = () => {

    // const { project, updateProject, deleteProject } = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        // defaultValues: {
        //     name: project?.name,
        //     description: project?.description,
        //     client: project?.client,
        //     deliveryDate: project?.deliveryDate 
        // }
    });

    const [alert, setAlert] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const router = useRouter();


    const onUpdateProject = async (data: FormData) => {
        setAlert(true);
        setTimeout(() => { 
            // updateProject(data as Project);
            setAlert(false);
            router.push('/projects');
        },1500);
    }

    const onDeleteProject = async () => {
        setOnDelete(true);
        setAlert(true);
        setTimeout(() => {
            // deleteProject(project?._id as string);
            setOnDelete(false);
            setAlert(false);
            router.push('/projects');
        },1500);
    }

  return (
    <Layout title='Edit Project'>
            <Box maxWidth={'350px'} display={'flex'} className='fadeInUp' m='20px auto 0'>
                <Typography color='info.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>Update</Typography>
                <Typography color='primary.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Project</Typography>
            </Box>
            <IconButton onClick={ onDeleteProject } sx={{position:'absolute', right:13, top:100}}  >
                <DeleteOutlineRounded color='primary' sx={{fontSize: 30}} />
            </IconButton>

            <form  className='fadeInUp' onSubmit={ handleSubmit(onUpdateProject) }>
                <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                        <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                <Chip
                                    label={onDelete ? 'Project deleted successfully' : 'Project updated successfully'}
                                    color={ onDelete ? 'error' : 'success'}
                                    className='fadeInUp'
                                    icon= { onDelete ? <DeleteOutlineRounded /> : <CheckCircleOutline /> }
                                    variant='outlined'
                                    sx={{ display: alert ? 'flex' : 'none'  }}
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
                                    sx={{ mb:2 }}
                                    multiline
                                    rows={3}
                                    {...register('description',{
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10, message:'Description must be at least 10 characters'
                                        }
                                    })} 
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    variant='filled' 
                                    fullWidth
                                    label='Description' 
                                />

                                <Input 
                                    type='date'
                                    sx={{ my:'2px', py:2, px:1 }} 
                                    {...register('deliveryDate',{
                                        required: 'Deliver Date is required',
                                        }
                                        )}
                                    fullWidth
                                    error={!!errors.deliveryDate}
                                />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth size='large' >
                                    Update Project
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </form>
        </Layout>
    )
}

export default EditProject