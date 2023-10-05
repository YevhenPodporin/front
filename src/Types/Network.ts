export interface PaginationParams {
    filter: {
        status?: RequestStatus | null
        search: string
    },
    pagination: {
        take: number,
        skip: number,
        direction: Direction,
        order_by: OrderBy
    }
}

export enum RequestStatus {
    APPROVED = 'APPROVED',
    REQUEST = 'REQUEST',
    REJECTED = 'REJECTED',
}

export enum OrderBy {
    created_at = 'created_at'
}

export enum Direction {
    desc = 'desc',
    asc = 'asc'
}

export interface RequestToFriend {
    from_user_id: string,
    to_user_id: string,
    status: RequestStatus | null
}

export type UserProfile = {
    id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    file_path?: string,
    user_id: number,
    is_online: boolean,
    updated_at: string,
    created_at: string
}

export interface UsersResponse {
    list:UserProfile[] | [],
    count: number
}

export type RequestToFriendBody = {
    to_user_id:number,
    status:RequestStatus
}
