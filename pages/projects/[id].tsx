import { useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button, Chip, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { AddCircleOutlineRounded, CheckCircleOutline, EditOutlined, GroupAdd, PersonRemoveOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { grey } from '@mui/material/colors';

import { Layout } from "../../components/layout"
import { FullScreenLoading } from '../../components/ui';
import { useProjects, useUI, useAdmin } from "../../hooks";
import { Task } from '../../components/projects';
import { Task as ITask, Project } from "../../interfaces"
import { pmApi } from '@/config';
// import { io, Socket } from 'socket.io-client'
// let socket: Socket;



type FormData = {
    name        : string;
    description : string;
    deliveryDate: string;
    priority    : string;
}

const PRIORITY = ['Low', 'Medium', 'High'];

const ProjectPage:NextPage = () => {

    const { project, createNewTask, deleteContributor, addTaskSocket, deleteTaskSocket, updateTaskSocket, changeTaskStateSocket, getProjectById } = useProjects();
    
    const { isModalOpen, toggleModal } = useUI(); 
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    
    const [priority, setPriority] = useState(PRIORITY[0]);
    
    const router = useRouter();
    const admin = useAdmin();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    useEffect(() => {
        setLoading(true);
        getProjectById(router.query.id as string);
        setTimeout(() => setLoading(false), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //SOCKET-IO ROOM CONNECTION & TASK LISTENERS
    // useEffect(() => {
    //     socket = io();
    //     socket.emit('open project', id);
    // },[id])

    // useEffect(() => {
    //     socket.on('task added', (task: ITask) => {
    //         addTaskSocket(task);
    //     })

    //     socket.on('task deleted', (task: ITask) => {
    //         deleteTaskSocket(task as ITask);
    //     })
        
    //     socket.on('updated task', (task: ITask) => {
    //         updateTaskSocket(task as ITask);
    //     })

    //     socket.on('completed task', (task: ITask) => {
    //         changeTaskStateSocket(task as ITask);
    //     })

    //     return () => {
    //         socket.off('task added');
    //         socket.off('task deleted');
    //         socket.off('updated task');
    //         socket.off('completed task');
    //     }
    // })
  


    const onSubmitTask = async( data: FormData ) => {
        createNewTask({...data, priority, project: project?._id as string} as ITask);
        setAlert(true);
        reset();
        setTimeout(() => {
            setAlert(false)
            toggleModal();
            router.push(`/projects/${project?._id}`);
        }, 10);
    }

    const onDeleteContributor = async (id: string) => {
        confirm('Are you sure you want to delete this contributor?') &&
        deleteContributor(id);
    }

    return (
        <Layout>
            {
                loading 
                    ? <FullScreenLoading/> 
                    : <> 
                        <Box display={'flex'} justifyContent={'start'} gap={2} alignItems={'center'} sx={{ borderBottom: '1px solid #ccc', py:2 }} className='fadeInUp' >
                            <Typography color='info.main' variant='h5' component='h1' sx={{ textAlign:'justify', letterSpacing: 1, fontWeight: 300, textTransform:'capitalize' }}>{project?.name}</Typography>
                            
                        { admin && 
                            <Link href={`/projects/edit-project/${project?._id}`}>
                                <Button
                                    size='small'
                                    variant='text'
                                    sx={{ py:0, textTransform:'capitalize', fontWeight:500, fontSize:'15px',':hover':{bgcolor:'secondary.main', color:'#FFF'} }}
                                    startIcon={<EditOutlined/> }  
                                 >Edit
                                </Button>
                            </Link>
                        } 
                        </Box>
                        <Box sx={{display:'flex', alignItems:'center', px:2, justifyContent:'space-between', my:2}} className='fadeInUp' >
                            <Typography variant='h6' component='h2' sx={{ fontWeight:500, textTransform:'capitalize' }}>Tasks</Typography>
                            { admin && 
                                <Button variant='text' onClick={ toggleModal }  sx={{ ":hover":{bgcolor:'secondary.main', color:'#FFF'},
                                 textTransform:'capitalize', py:0, fontWeight:500 }} endIcon={<AddCircleOutlineRounded/>}>
                                    Add Task
                                </Button>
                            }
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} className='fadeInUp' >
                            {
                                project?.tasks.map(task => (
                                    <Task task={task} key={task._id}  />
                                    )
                                )  
                            }
                        </Box>

                        { admin && (
                        <>  
                        
                            <Box sx={{display:'flex', alignItems:'center', px:2, justifyContent:'space-between', my:2}} className='fadeInUp' >
                                <Typography variant='h6' component='h2' sx={{ fontWeight:500, textTransform:'capitalize' }}>Contributors</Typography>
                                <Link href={`/projects/new-contributor/${project?._id}`} style={{textDecoration:'none'}}>
                                        <Button variant='text' sx={{ ":hover":{bgcolor:'secondary.main', color:'#FFF'   }, textTransform:'capitalize', py:0, fontWeight:500 }} size='small' endIcon={<GroupAdd/>}>
                                            Add 
                                        </Button>
                                </Link>
                            </Box>
                            {  
                            project?.contributors?.length ? 
                                project?.contributors?.map(contributor => (   
                                    <Grid key={contributor?._id} 
                                        sx={{ display:'flex', alignItems:'center', flexWrap:'wrap', justifyContent:'space-between', gap:1, mb:2, borderRadius:3, p:3, mx:4, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[200] }, transition: 'all .3s ease-in-out' }} 
                                        item xs={12} md={10} className='fadeInUp' >
                                        <Typography color='info.main' variant='body1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:1, fontWeight:300, textTransform:'capitalize' }}>{contributor?.name}</Typography>
                                        <Typography color='primary.main' variant='body2' fontWeight={ 500 } sx={{ mr:1, letterSpacing:1, fontWeight:300, textTransform:'capitalize' }}>{contributor?.email}</Typography>
                                        { admin &&
                                            <IconButton
                                                    onClick={ () => onDeleteContributor(contributor?._id as string) }
                                                >
                                                <PersonRemoveOutlined sx={{color:'primary.main'}} />    
                                            </IconButton>
                                        }
                                    </Grid> 
                                )) 
                                : <Typography variant='body1' fontWeight={ 500 } sx={{ ml:3, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>No contributors yet.</Typography>
                            }
                        </>
                       )}
                        <Modal
                            open={ isModalOpen }
                            onClose={ toggleModal }
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                            sx={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}
                            >
                            <Box sx={{  width: 400 }}>
                            <form id='task-form' onSubmit={handleSubmit(onSubmitTask)}>
                                <Box display='flex' flexDirection='column' gap={2} sx={{ width:'100%', bgcolor:'background.paper', p:2, borderRadius:2 }}>
                                    <Box display='flex' alignItems='center' justifyContent={'center'} mt={2} gap={1}>
                                        <Typography id="parent-modal-title" color='info.main' fontWeight={300} textTransform={'capitalize'} textAlign={'center'} variant="h5" component="h2">new</Typography>
                                        <Typography id="parent-modal-title" textAlign={'center'} variant="h5" component="h2">task</Typography>
                                    </Box>

                                    <Grid item xs={ 12 }>
                                        <Chip
                                            label='Task succesfully created'
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
                                    </Grid>
                                    
                                    
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Priority"
                                        >
                                            { PRIORITY.map( priority => <MenuItem  key={ priority } value={priority}>{priority}</MenuItem>) }
                                        </Select>

                                    </FormControl>
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
                                    <Button type='submit' color='info' variant='contained' fullWidth size='large' >
                                        Add Task
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Modal>
                </>
            }
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
//     const { id } = params as { id: string}
//     const { token = "" } = req.cookies;
//     if(!token){ 
//        return {
//           redirect:{
//              destination: '/auth/login',
//              permanent: false
//           }
//        }
//     } 
//     const config = {
//        headers: {
//            'Content-Type' : 'application/json',
//            'Authorization': `Bearer ${token}`
//        }
//     }
//     try {    
//         const { data } = await pmApi.get<Project>(`/projects/${id}`, config); 
//         return{
//             props:{
//                     project: data || []
//                 }
//             }
//     } catch (error) {
//         return {  
//                 redirect: {
//                     destination: '/',
//                     permanent: false,
//                 }
//             }
//         }
//     }
export default ProjectPage;