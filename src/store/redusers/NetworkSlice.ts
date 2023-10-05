import { Direction, OrderBy, PaginationParams, RequestStatus, UserProfile } from "../../Types/Network";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NetworkState {
    list: {
        my: {
            params: PaginationParams, data: UserProfile[]
        }
        request: {
            params: PaginationParams, data: UserProfile[]
        }
        all: {
            params: PaginationParams, data: UserProfile[]
        }
    },
    isLoading: boolean,
    error: string,
}

const initialState: NetworkState = {
    list: {
        my: {
            params: {
                filter: {
                    search: '',
                    status: RequestStatus.APPROVED
                },
                pagination: {
                    take: 10,
                    skip: 0,
                    direction: Direction.asc,
                    order_by: OrderBy.created_at
                },
            },
            data: []
        },
        request: {
            params: {
                filter: {
                    search: '',
                    status: RequestStatus.REQUEST
                },
                pagination: {
                    take: 10,
                    skip: 0,
                    direction: Direction.asc,
                    order_by: OrderBy.created_at
                },
            },
            data: []
        },
        all: {
            params: {
                filter: {
                    search: '',
                    status: null
                },
                pagination: {
                    take: 10,
                    skip: 0,
                    direction: Direction.asc,
                    order_by: OrderBy.created_at
                },
            },
            data: []
        },
    },
    isLoading: false,
    error: '',
}

export enum ListType {
    my = "my",
    request = "request",
    all = "all",
}

export const networkSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {
        networkFetching(state) {
            state.isLoading = true
        },
        clearState(state) {
            state = initialState
        },
        myFriendsFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
                state.isLoading = false;
                state.list.my.data = action.payload
        },
        requestsFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
                state.isLoading = false;
                state.list.request.data = action.payload
        },
        allUsersFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
                state.isLoading = false;
                state.list.all.data = action.payload
        },

        nextPage(state, action: PayloadAction<ListType>) {
            state.list[action.payload].params.pagination.skip = state.list[action.payload].params.pagination.skip + state.list[action.payload].params.pagination.take
        },

        searchUsers(state, action: PayloadAction<{value:string,type:ListType}>) {
            const {value,type} = action.payload
            state.list[type].data = [];
            state.list[type].params.pagination = initialState.list[type].params.pagination;
            state.list[type].params.filter.search = value;
        },

        networkFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default networkSlice.reducer;