import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import './UserProfile.scss';
import ImageWithStatus from "../ImageWithStatus/ImageWithStatus";
import { useEditProfileMutation } from '../../store/services/userProfileService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import moment from 'moment/moment';
import { userEditProfile } from '../../Types/user';
import { popupSlice } from "../../store/redusers/ShowHidePopupSlice";
import { userSlice } from '../../store/redusers/UserProfileSlice';

function UserProfilePopup() {
    const {user} = useAppSelector(state => state.userProfileReducer);
    const {file_path, first_name, is_online, last_name, date_of_birth, email} = user;
    const [fileUrl, setFileUrl] = useState('');
    const dispatch = useAppDispatch();

    const [dataToSend, setDataToSend] = useState<userEditProfile>({
        first_name,
        last_name,
        date_of_birth,
        email,
        file: null
    });

    useEffect(() => {
        setDataToSend(prev => (
            {...prev, date_of_birth, email, last_name, first_name}
        ))
    }, [user])

    const [editProfile, {error, data}] = useEditProfileMutation()

    useEffect(() => {
        if (data) {
            dispatch(userSlice.actions.userProfileFetchingSuccess(data))
            dispatch(popupSlice.actions.hidePopup())
        }
    }, [data])

    const formChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        const {target} = e;
        if (target.id === ":r2:") return; // handler для datepicker отдельный
        if (target.id === 'avatar') {
            const file = target.files[0];
            setFileUrl(URL.createObjectURL(file))
            setDataToSend({...dataToSend, file: target.files[0]})
        } else {
            setDataToSend(prev => {
                return {...prev, [target.name]: target.value}
            })
        }
    }


    const datePickerHandler = (date: any) => {
        setDataToSend(prev => {
            return {...prev, date_of_birth: moment(date).format("YYYY-MM-DD")}
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        Object.entries<typeof dataToSend[keyof typeof dataToSend]>(dataToSend).forEach(([key, value]) => {
            value && formData.append(key, value)
        })
        await editProfile(formData)
    }

    return (
        <div className={'content_wrapper'}>
            <h2>Edit profile</h2>
            <Box
                component="form"
                onChange={formChangeHandler}
                onSubmit={handleSubmit}
                sx={{mt: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <div className={'avatar_wrapper'}>
                            <ImageWithStatus status={is_online} file_path={fileUrl || file_path} withoutStatus={true}/>
                            <label htmlFor={'avatar'}>Edit</label>
                            <input
                                type="file"
                                name={'file'}
                                id={'avatar'}
                                hidden
                            />
                        </div>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name={'first_name'}
                            value={dataToSend.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name={'last_name'}
                            id="last_name"
                            label="Last Name"
                            value={dataToSend.last_name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                onChange={(e: any) => {
                                    datePickerHandler(e)
                                }}
                                value={moment(dataToSend.date_of_birth) || moment()}
                                views={["day", "month", "year"]}
                                format="YYYY-MM-DD"
                                label={"Date of birthday"}
                                className={'date-picker date_of_birth'}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name={'email'}
                            label="Email Address"
                            type={'email'}
                            value={dataToSend.email}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    color={'secondary'}
                >
                    Save changes
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={() => dispatch(popupSlice.actions.hidePopup())}
                >
                    Cancel
                </Button>
            </Box>
        </div>
    );
}

export default UserProfilePopup;