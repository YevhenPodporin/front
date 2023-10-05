import { RequestStatus, UserProfile } from '../../Types/Network';
import { Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { NetworkApi } from '../../store/services/NetworkService';
import ImageWithStatus from '../ImageWithStatus/ImageWithStatus';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../api/hooks/redux';

type UserCardItemProps = {
    user: UserProfile,
    tabValue: RequestStatus | null | undefined,
    requestHandler: () => void

}


function UserCardItem({user, tabValue, requestHandler}: UserCardItemProps) {
    const [userRequest, {isSuccess}] = NetworkApi.useRequestToFriendMutation()

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
    }

    useEffect(() => {
        if (isSuccess) {
            requestHandler()
        }
    }, [isSuccess])
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