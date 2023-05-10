import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layout';
import { utils } from '../../utils';
import { useAuth } from '@/hooks';

type FormData = {
    name    : string;
    email   : string;
    password: string;
}

export const CreateAccount: NextPage = () => {
    const { createAccount } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { query, replace } = useRouter()    

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const onSignUp = async ({name, email, password}:FormData) =>{
        const { hasError, message } = await createAccount(name, email, password);
        if(hasError) {
            setError(true);
            setMessage(message!)
            setTimeout(() => setError(false), 1500);
            return;
        }
        const destination = query.p?.toString() || '/';
        replace(destination);
    }
    
    
    return (
        <AuthLayout title='Sign In Page'>
          <Box maxWidth={'350px'} className='fadeInUp' mx='auto'>
              <Typography color='secondary' variant='h3' component='h1' fontWeight={ 300 } sx={{ textAlign:'justify', ml: 2, letterSpacing: 2, textTransform:'capitalize' }}>
                Sign Up
              </Typography>
              <Typography  variant='h3' component='h1' sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>
                and manage your projects
              </Typography>
          </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onSignUp) }>
                <Grid sx={{ maxWidth:'350px', mx:'auto', p:4, borderRadius:'0 0 15px 15px', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:2 }}>
                      <Grid container spacing={ 3 }>
                        
                        <Grid item xs={12}>    
                            <Chip
                                label={message || 'User already exists'}
                                color='error'
                                className='fadeIn'
                                icon= {<ErrorOutline/>}
                                variant='outlined'
                                sx={{ display: error ?  'flex' : 'none' , mt:1 }}
                            />
                        </Grid>
                        
                        <Grid item xs={ 12 } >
                            <TextField 
                                type='text'
                                {...register('name',{
                                    required: 'Name is required',
                                    minLength: {
                                        value: 2, message:'Name must be at least 2 characters'
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
                                type='email'
                                {...register('email',{
                                    required: 'Email is required',
                                    validate: utils.validator.isEmail
                                })}
                                error={ !!errors.email }
                                helperText={errors.email?.message}
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
                                helperText={errors.password?.message}
                                variant='filled' 
                                type={'password'} 
                                fullWidth 
                                label='Password' />
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <Button type='submit' color='secondary' variant='contained' fullWidth className='circular-btn' size='large' >
                                Create Account
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                                <Link href={'/auth/login'} style={{textDecoration:'none'}}>
                                    <Typography variant='body2' color='black'>
                                        Already have an account? Login
                                    </Typography>
                                </Link>
                        </Grid>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}


export default CreateAccount;