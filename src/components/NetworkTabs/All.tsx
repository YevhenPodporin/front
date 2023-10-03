import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { NetworkApi } from '../../store/services/NetworkService';
import  { networkSlice } from '../../store/redusers/NetworkSlice';
import Users from './Users';

type props = {
    index: number,
    value: number
}

function All({value, index}: props) {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.networkSlice.list.all);
    const {data, isFetching, currentData} = NetworkApi.useFetchAllUsersQuery(users.params);

    useEffect(() => {
        if (data && !isFetching) {
            // dispatch(networkSlice.actions.allUsersFetchingSuccess(data.list))
        }
    }, [isFetching, data])

    const fetchData = () => {
        dispatch(networkSlice.actions.nextPageAllUsers());
    }

    const onSearch = (value: string) => {
        dispatch(networkSlice.actions.allSearch(value));
    }

    return (
        <div>
            <Users
                value={value}
                index={index}
                users={data?.list ?? []}
                tabValue={null}
                hasMore={data ? data.list.length < data.count && !isFetching: false}
                onSearch={onSearch}
                nextFunction={fetchData}
                userDataLength={ data?.list.length ?? 0}
            />
        </div>
    );
}

export default All;