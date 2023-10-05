import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { RequestStatus } from '../../Types/Network';
import { NetworkApi, useFetchMyFriendsQuery } from '../../store/services/NetworkService';
import { ListType, networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';
import { CircularProgress } from '@mui/material';

type props = {
    index: number,
    value: number
}

function My({value, index}: props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.networkSlice.list.my);
    const {data, isFetching, currentData} = useFetchMyFriendsQuery(users.params);

    useEffect(() => {
        if (currentData && data && !isFetching) {
            dispatch(networkSlice.actions.myFriendsFetchingSuccess(currentData.list))
        }
    }, [isFetching, currentData])

    const fetchNextData = () => {
        if (data && users.data.length < data.count) {
            dispatch(networkSlice.actions.nextPage(ListType.my));
        }
    }

    const onSearch = (value: string) => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.searchUsers({value, type: ListType.my}));
    }

    const requestHandler = (): void => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.clearState())
    }

    return (

        <Users
            isFetching={isFetching}
            requestHandler={requestHandler}
            value={value}
            index={index}
            users={users.data}
            tabValue={RequestStatus.APPROVED}
            hasMore={data ? users.data.length < data.count && !isFetching : false}
            onSearch={onSearch}
            searchValue={users.params.filter.search}
            nextFunction={fetchNextData}
            userDataLength={users.data.length}
        />
    );
}

export default My;


