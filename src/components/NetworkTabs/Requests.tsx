import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { NetworkApi } from '../../store/services/NetworkService';
import { networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';
import { RequestStatus } from '../../Types/Network';

type props = {
    index:number,
    value:number
}

function Requests({value,index}:props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state =>  state.networkSlice.list.request);
    const {data, isSuccess} = NetworkApi.useFetchRequestsQuery(users.params);

    useEffect(() => {
        if (isSuccess ) {
            dispatch(networkSlice.actions.requestsFetchingSuccess(data.list))
        }
    }, [isSuccess])

    const fetchData = () => {
        if (data && users.data.length < data.count) {
            dispatch(networkSlice.actions.nextPageRequests());
            dispatch(networkSlice.actions.requestsFetchingSuccess(data.list))
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
                tabValue={RequestStatus.REQUEST}
                hasMore={data ? users.data.length < data.count : true}
                onSearch={onSearch}
                nextFunction={fetchData}
                userDataLength={data?users.data.length:0}
            />
        </div>
    );
}

export default Requests;