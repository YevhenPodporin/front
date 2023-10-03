import { RequestStatus, UserProfile } from '../../Types/Network';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { NetworkApi } from '../../store/services/NetworkService';

type UserCardItemProps = {
    user: UserProfile,
    tabValue: RequestStatus | null | undefined,
}

function UserCardItem({user, tabValue,}: UserCardItemProps) {
    const [createPost] = NetworkApi.useRequestToFriendMutation()

    const handleClick = () => {
        createPost({
            to_user_id: user.user_id,
            status: tabValue === RequestStatus.REQUEST
                ? RequestStatus.APPROVED
                : tabValue === RequestStatus.APPROVED
                    ? RequestStatus.REJECTED
                    : RequestStatus.REQUEST
        })
    }


    return (
        <Grid item xs={2} sm={4} md={4} key={user.id}>
            <Card sx={{maxWidth: '100%'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.first_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.last_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleClick}
                        size="small">{tabValue === null
                        ? 'Add to friend'
                        : tabValue === RequestStatus.REQUEST ? 'Approved'
                            : 'Remove from friend'}</Button>
                    <Button size="small">Send message</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default UserCardItem;