import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { RequestStatus } from '../../Types/Network';
import { NetworkApi, useFetchMyFriendsQuery } from '../../store/services/NetworkService';
import { ListType, networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';

type props = {
    index: number,
    value: number
}

function My({value, index}: props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.networkSlice.list.my);
    const {data, isSuccess, isFetching, currentData} = useFetchMyFriendsQuery(users.params);

    useEffect(() => {
        if (currentData && data) {
            dispatch(networkSlice.actions.myFriendsFetchingSuccess(currentData.list))
        }
    }, [isSuccess, currentData])

    const fetchNextData = () => {
        if (data && users.data.length < data.count) {
            dispatch(networkSlice.actions.nextPage(ListType.my));
        }
    }

    const onSearch = (value: string) => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.searchUsers({value, type: ListType.request}));
    }

    return (
        <Users
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


