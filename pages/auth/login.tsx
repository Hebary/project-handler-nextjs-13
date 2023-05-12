"use client"
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layout';
import { utils } from '../../utils';
import { useAuth, useProjects } from '@/hooks';
import { ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';

type FormData = {
    email    : string;
    password : string;
}

export const Login: NextPage = () => {

    const { loginUser }  = useAuth();
    const { loadProjectsInState }  = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { query, replace} = useRouter();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const onLogin = async ({ email, password }: FormData) => {
        const { hasError, message } = await loginUser(email, password);
        if(hasError) {
            setError(true);
            setMessage(message!)
            setTimeout(() => setError(false), 1700);
            return;
        }
        loadProjectsInState();
        // navigate to previous url 
        const destination = query.p?.toString() || '/';
        replace(destination);
    }


    return (
        <AuthLayout title='Login Page'>
            <Box maxWidth={'350px'} className='fadeInUp' mx='auto'>
                <Typography color='secondary' variant='h3' component='h1' sx={{ textAlign:'justify', ml:2, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>Log in</Typography>
                <Typography variant='h3' component='h1' sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>and manage your projects</Typography>
            </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onLogin) }>
                <Grid sx={{ maxWidth:'350px', mx:'auto', p: 4, borderRadius: '0 0 15px 15px', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt: 2 }}>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={12}>    
                            <Chip
                                label={message || 'Invalid credentials'}
                                color='error'
                                className='fadeInUp'
                                icon= {<ErrorOutline/>}
                                variant='outlined'
                                sx={{ display: error ?  'flex' : 'none' , mt:1 }}
                            />
                        </Grid>
                        <Grid item xs={ 12 } >
                            <TextField 
                                type='email'
                                {...register('email',{
                                    required: 'Email is required',
                                    validate: utils.validator.isEmail
                                })}
                                error={ !!errors.email }
                                helperText={errors?.email?.message as string}
                                variant='filled' 
                                fullWidth 
                                label='Email' />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField
                                {...register('password',{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6, message:'Password must be at least 6 characters'
                                    }
                                })} 
                                error={!!errors.password}
                                helperText={errors.password?.message as string}
                                variant='filled' 
                                type={'password'} 
                                fullWidth 
                                label='Password' />
                        </Grid>
                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <Button type='submit' color='secondary' variant='contained' fullWidth className='circular-btn' size='large' >
                                Log in
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                            <Link style={{textDecoration:'none', transition:'all .4s ease-in-out'}} href={'/auth/create-account'}>
                                <Typography variant='body2' color='black'>
                                    Don&apos;t have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}


export default Login