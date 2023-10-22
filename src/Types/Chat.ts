import { PaginationParams, UserProfile } from './Network';

export type CreateChatType = {
    from_user_id: number,
    to_user_id: number
}

export type chatListItem = {
    id: number,
    from_user_id: number,
    to_user_id: number,
    updated_at: string,
    created_at: string
    to_user: { profile: UserProfile }
    from_user: { profile: UserProfile }
    last_message: string
    unread_messages:number
}

export type sendMessageType = {
    message: string,
    chat_id: string
    file?: {
        data: string,
        fileName: string | undefined
    }
}

export interface getMessages {
    chat_id?: number,
    pagination: PaginationParams['pagination']
}

export interface MessagesResponse {
    list: messageListItem[] | [],
    count: number
}

export type messageListItem = {
    id: number
    chat_id: number
    created_at: string
    message: string
    file: string | null
    sender_id: number
    updated_at: string
}

export type Notifications = {
    id: number
    to_chat_id: number
    to_user_id: number
    unread_messages: number,
    message:string
}