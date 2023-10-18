import { UserProfile } from './Network';

export type CreateChatType = {
    from_user_id: number,
    to_user_id: number
}

export type chatListItem = {
    id: number,
    from_user_id: number,
    to_user_id: number,
    unread_messages: string | null,
    last_message: string | null,
    updated_at: string,
    created_at: string
    to_user: { profile: UserProfile }
    from_user: { profile: UserProfile }
}

export type sendMessageType = {
    message: string,
    chat_id: string
    file?: {
        data: string,
        fileName: string | undefined
    }
}

// export interface MessagesResponse {
//     list:UserProfile[] | [],
//     count: number
// }