import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { RequestStatus } from '../../Types/Network';
import { NetworkApi } from '../../store/services/NetworkService';
import { networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';

type props = {
    index: number,
    value: number
}

function My({value, index}: props) {
    const dispatch = useAppDispatch();

    const users = useAppSelector(state => state.networkSlice.list.my);
    const {data, isSuccess} = NetworkApi.useFetchMyFriendsQuery(users.params);

    useEffect(() => {
        if (isSuccess ) {
            dispatch(networkSlice.actions.myFriendsFetchingSuccess(data.list))
        }
    }, [isSuccess])

    const fetchData = () => {
        if (data && users.data.length < data.count) {
            dispatch(networkSlice.actions.nextPageMyFriends());
            // dispatch(networkSlice.actions.myFriendsFetchingSuccess(data.list))
        }
    }


    const onSearch = (value: string) => {

    }

    return (
        <div>
            <Users
                value={value}
                index={index}
                users={users.data}
                tabValue={RequestStatus.APPROVED}
                hasMore={data ? users.data.length < data.count : false}
                onSearch={onSearch}
                nextFunction={fetchData}
                userDataLength={data?users.data.length:0}
            />
        </div>
    );
}

export default My;