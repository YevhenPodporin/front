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

export const networkSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {
        networkFetching(state) {
            state.isLoading = true
        },
        myFriendsFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
            if (JSON.stringify(state.list.my.data) !== JSON.stringify(action.payload)) {
                state.isLoading = false;
                state.list.my.data = [...state.list.my.data, ...action.payload]
            }
        },
        requestsFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
            if (JSON.stringify(state.list.request.data) !== JSON.stringify(action.payload)) {
                state.isLoading = false;
                state.list.request.data = [...state.list.request.data, ...action.payload]
            }
        },
        allUsersFetchingSuccess(state, action: PayloadAction<UserProfile[] | []>) {
            if (JSON.stringify(state.list.all.data) !== JSON.stringify(action.payload)) {
                state.isLoading = false;
                state.list.all.data = [...state.list.all.data, ...action.payload]
            }
        },
        nextPageMyFriends(state, action: PayloadAction) {
            state.list.my.params.pagination.skip = state.list.my.params.pagination.skip + state.list.my.params.pagination.take
        },
        nextPageRequests(state, action: PayloadAction) {
            state.list.request.params.pagination.skip = state.list.request.params.pagination.skip + state.list.request.params.pagination.take
        },
        nextPageAllUsers(state, action: PayloadAction) {
            state.list.all.params.pagination.skip = state.list.all.params.pagination.skip + state.list.all.params.pagination.take
        },
        myFriendsSearch(state, action: PayloadAction<string>) {
            state.list.my = initialState.list.my
            state.list.my.params.filter.search = action.payload
        },
        requestSearch(state, action: PayloadAction<string>) {
            state.list.request = initialState.list.my
            state.list.request.params.filter.search = action.payload
        },
        allSearch(state, action: PayloadAction<string>) {
            state.list.all.data = [];
            state.list.all.params.pagination = initialState.list.all.params.pagination;
            state.list.all.params.filter.search = action.payload;
        },



        networkFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default networkSlice.reducer;