import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Link } from "react-router-dom";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { useState } from "react";
import {useAuth} from "../api/hooks/useAuth";
import moment from "moment";
import {Input} from "@mui/material";
import { userSignUpType } from '../Types/user';
const defaultTheme = createTheme();

function Register() {
    const {signUp} = useAuth();
    const [fileUrl, setFileUrl] = useState('');
    const [formData, setFormData] = useState<userSignUpType>({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
        file:null
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signUp(formData)
    };
    const formChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { target } = e;
        if(target.id === ":r2:") return;
        if(target.id === 'avatar'){
            const file = target.files[0];
            setFileUrl(URL.createObjectURL(file))
            setFormData({...formData,file:target.files[0]})
        }else{
            setFormData(prev => {
                return {...prev, [target.name]: target.value}
            })
        }
    }
    const datePickerHandler = (date:any) => {
        setFormData(prev => {
            return {...prev, date_of_birth:moment(date).format("YYYY-MM-DD")}
        })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 0,
                        paddingTop:6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    {fileUrl && <><Grid item mt={3} xs={12} sm={6} className={'upload-avatar'} title={"Avatar"}>
                        <img src={fileUrl}/>
                    </Grid>
                        <Typography component="p" variant="body1">
                            Avatar
                        </Typography></>}
                    <Box
                        component="form"
                        onChange={formChangeHandler}
                        onSubmit={handleSubmit}
                        sx={{mt: 2}}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Input
                                    type={'file'}
                                    fullWidth
                                    id="avatar"
                                    placeholder={"Select your avatar"}
                                    name="file"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider  dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        onChange={(e:any)=>{
                                            datePickerHandler(e)
                                        }}
                                        views={["day", "month", "year"]}
                                        format="YYYY-MM-DD"
                                        label={"Date of birthday"}
                                        className={'date-picker'}/>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // error={!!formData.email && !regExpEmail.test(formData.email)}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;