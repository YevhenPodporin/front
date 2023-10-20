import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Network from "./pages/Network";
import Register from "./pages/Register";
import NotFoundPage from './pages/_404';
import TestPage from './pages/Test';
import ChatById from './pages/ChatById';

export const privateRoutes = [
    {
        title: "Chat",
        path: '/chat',
        Component: Chat
    },
    {
        path: '/chat/:id?',
        Component: ChatById
    },
    {
        title: "Network",
        path: '/network',
        Component: Network
    },
    {
        title: "Test",
        path: '/test',
        Component: TestPage
    },
    {
        title: 'Not found',
        path: '*',
        Component:NotFoundPage
    }
]

export const publicRoutes = [
    {
        title: "Login",
        path: '/login',
        Component: Login
    },
    {
        title: "Register",
        path: '/register',
        Component: Register
    }
];

