import ChatList from '../components/ChatPage/ChatList';
import ChatMain from '../components/ChatPage/ChatMain';
import '../assets/styles/ChatPage.scss'
import { useParams } from 'react-router-dom';
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';
import Box from '@mui/material/Box';


function ChatById() {
    return (
        <div className={'chat_wrapper'}>
            <ChatList/>
            <ChatMain/>
        </div>
    );
}

export default ChatById;