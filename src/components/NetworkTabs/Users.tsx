import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCardItem from '../UserCardItem/UserCardItem';
import { RequestStatus, UserProfile } from '../../Types/Network';
import { DebounceInput } from 'react-debounce-input';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    userDataLength: number;
    nextFunction: () => void;
    hasMore: boolean;
    users: UserProfile[] | [];
    tabValue: RequestStatus | null;
    onSearch: (value: string) => void;
    searchValue?: string;
    requestHandler: () => void
    isFetching:boolean
}


function Users(props: TabPanelProps) {
    const {children,isFetching,searchValue, value,requestHandler, index, userDataLength, onSearch, nextFunction, tabValue, hasMore, users, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {isFetching && <CircularProgress sx={{position: 'fixed', top: '50%', left: '50%'}}/>}
            {value === index && (<><Box display={'flex'} justifyContent={'center'} mt={5}>
                <DebounceInput
                    placeholder={'Example: Oleg Igorevich'}
                    debounceTimeout={300}
                    onChange={(e) => onSearch(e.target.value)}
                    value={searchValue}
                    id={'search_users'}
                    label="Search users"
                    autoComplete={'false'}/>
            </Box>
                <Box mt={5}>
                    <InfiniteScroll
                        dataLength={userDataLength} //This is important field to render the next data
                        next={nextFunction}
                        hasMore={hasMore}
                        loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {users.length &&
                            <Grid id={'users_wrapper'} padding={'0 20px'} container spacing={{xs: 2, md: 3}}
                                  columns={{xs: 2, sm: 8, md: 20}}>
                                {users.map((user, index) => (
                                    <UserCardItem
                                        key={index}
                                        user={user}
                                        tabValue={tabValue}
                                        requestHandler={requestHandler}
                                    />
                                ))}
                            </Grid>
                        }
                    </InfiniteScroll>
                </Box></>)
            }
        </div>

    );
}


export default Users;