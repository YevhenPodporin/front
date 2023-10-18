import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { NetworkApi, useFetchRequestsQuery } from '../../store/services/NetworkService';
import { ListType, networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';
import { RequestStatus } from '../../Types/Network';

type props = {
    index:number,
    value:number
}

function Requests({value,index}:props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state =>  state.networkSlice.list.request);
    const {data, isSuccess, isFetching, currentData} = useFetchRequestsQuery(users.params);

    useEffect(() => {
        if (currentData ) {
            dispatch(networkSlice.actions.usersFetchingSuccess({data:currentData.list, type:ListType.request}))
        }
    }, [isSuccess, currentData])

    const fetchNextData = () => {
        if (data && users.data.length < data.count) {
            dispatch(networkSlice.actions.nextPage(ListType.request));
        }
    }

    const onSearch = (value: string) => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.searchUsers({value, type:ListType.request}));
    }
    const requestHandler = () => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.clearState())
    }

    return (
        <div>
            <Users
                isFetching={isFetching}
                requestHandler={requestHandler}
                value={value}
                index={index}
                users={users.data}
                tabValue={RequestStatus.REQUEST}
                hasMore={data ? users.data.length < data.count && !isFetching : false}
                onSearch={onSearch}
                searchValue={users.params.filter.search}
                nextFunction={fetchNextData}
                userDataLength={users.data.length}

            />
        </div>
    );
}

export default Requests;