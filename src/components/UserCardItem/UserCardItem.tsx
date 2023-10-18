import { RequestStatus, UserProfile } from '../../Types/Network';
import { Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { NetworkApi } from '../../store/services/NetworkService';
import ImageWithStatus from '../ImageWithStatus/ImageWithStatus';
import React, { useEffect } from 'react';
import { CreateChatType } from '../../Types/Chat';
import { useAppSelector } from '../../api/hooks/redux';
import { useCreateChatMutation } from '../../store/services/ChatService';
import { useNavigate } from 'react-router-dom';

type UserCardItemProps = {
    user: UserProfile,
    tabValue: RequestStatus | null | undefined,
    requestHandler: () => void

}

function UserCardItem({user, tabValue, requestHandler}: UserCardItemProps) {
    const [userRequest, {isSuccess}] = NetworkApi.useRequestToFriendMutation()
    const myProfile = useAppSelector(state => state.userProfileReducer.user)
    const [createChat, {data, isSuccess: isCreated}] = useCreateChatMutation();
    const navigate = useNavigate();
    const handleClickLeftButton = async () => {
        await userRequest({
            to_user_id: user.user_id,
            status: tabValue === RequestStatus.REQUEST
                ? RequestStatus.APPROVED
                : tabValue === RequestStatus.APPROVED
                    ? RequestStatus.REJECTED
                    : RequestStatus.REQUEST
        })
    }

    const handleClickRightButton = async () => {
        if (tabValue === RequestStatus.REQUEST) {
            await userRequest({
                to_user_id: user.user_id,
                status: RequestStatus.REJECTED
            })
        }
        if (tabValue === RequestStatus.APPROVED && myProfile.id) {
            createChat({from_user_id: myProfile.id, to_user_id: user.user_id})
        }
    }

    useEffect(() => {
        if (isSuccess) {
            requestHandler()
        }
    }, [isSuccess])
    useEffect(() => {
        if (isCreated && data) {
            navigate('/chat/' + data.chat.id)
        }
    }, [isCreated])
    return (
        <Grid item xs={2} sm={4} md={5} key={user.id}>
            <Card>
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <ImageWithStatus status={user.is_online} file_path={user.file_path}/>

                    <Typography gutterBottom variant="h5" component="div">
                        {user.first_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.last_name}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    <ButtonGroup size="small" aria-label="small button group">
                        <Button
                            onClick={handleClickLeftButton}
                        >{tabValue === null
                            ? 'Add to friend'
                            : tabValue === RequestStatus.REQUEST ? 'Approved'
                                : 'Dismiss'}</Button>
                        <Button onClick={handleClickRightButton}>{
                            tabValue === RequestStatus.REQUEST ? 'Dismiss' : 'Send message'
                        }</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default UserCardItem;