import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../api/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { userSignInType } from '../Types/user';
import { googleLogout, useGoogleLogin, Context, GoogleLogin } from '@react-oauth/google';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { privateRoutes } from '../routes';


const defaultTheme = createTheme();

function Login() {
    const {signIn} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<userSignInType>({
        email: '',
        password: ''
    });

    const inputHandler = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn(formData);
    }


    const auth = (token: string) => {
        axios.post(process.env.REACT_APP_PUBLIC_URL + '/auth/google', {
            token
        }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(({data}: any) => {

            localStorage.setItem('token', data.accessToken);
            navigate(privateRoutes[0].path);

        }).catch(e => {
            toast.error(e.message)
        })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                onChange={({target}) => inputHandler('email', target.value)}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={({target}) => inputHandler('password', target.value)}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                            {/*<button type={'button'} onClick={() => login()}>Sign in with Google 🚀</button>*/}
                            <GoogleLogin

                                theme={'outline'}
                                onSuccess={credentialResponse => {
                                    if (credentialResponse.credential) {
                                        auth(credentialResponse.credential)
                                    }
                                }}
                                onError={() => {
                                    toast.error('Login error')
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Login;