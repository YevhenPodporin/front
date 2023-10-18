import ChatList from '../components/ChatPage/ChatList';
import ChatMain from '../components/ChatPage/ChatMain';
import '../assets/styles/ChatPage.scss'
import { useParams } from 'react-router-dom';
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';
import Box from '@mui/material/Box';


function Chat() {
    return (
        <div className={'chat_wrapper'}>
            <ChatList/>
            <Box textAlign={'center'} fontWeight={'bold'} alignItems={'center'} display={'flex'}
                 justifyContent={'center'}
                 fontSize={24}>
                <ArrowRightAltTwoToneIcon className={'arrow_to_left'}/> Choose the chat from list
            </Box>
        </div>
    );
}

export default Chat;