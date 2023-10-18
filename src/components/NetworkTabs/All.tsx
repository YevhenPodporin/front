import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { NetworkApi, useFetchAllUsersQuery } from '../../store/services/NetworkService';
import { ListType, networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';

type props = {
    index: number,
    value: number
}

function All({value, index}: props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.networkSlice.list.all);
    const {data, isFetching, currentData} = useFetchAllUsersQuery(users.params);

    const fetchNextData = () => {
        dispatch(networkSlice.actions.nextPage(ListType.all));
    }

    const onSearch = (value: string) => {
        dispatch(NetworkApi.util.resetApiState())
        dispatch(networkSlice.actions.searchUsers({value, type:ListType.all}));
    }
    useEffect(() => {
        if (currentData) {
            dispatch(networkSlice.actions.usersFetchingSuccess({data:currentData.list, type:ListType.all}))
        }
    }, [isFetching, currentData])

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
                tabValue={null}
                hasMore={data ? users.data.length < data.count && !isFetching : false}
                onSearch={onSearch}
                searchValue={users.params.filter.search}
                nextFunction={fetchNextData}
                userDataLength={users.data.length}
            />
        </div>
    );
}

export default All;