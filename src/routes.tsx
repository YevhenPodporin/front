import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Friends from "./pages/Friends";
import Register from "./pages/Register";

export const privateRoutes = [
    {
        title:"Profile",
        path: '/profile',
        Component: Profile
    },
    {
        title:"Chat",
        path: '/chat',
        Component: Chat
    },
    {
        title:"Friends",
        path: '/friends',
        Component: Friends
    }
]

export const publicRoutes = [
    {
        title:"Login",
        path: '/login',
        Component: Login
    },
    {
        title:"Register",
        path: '/register',
        Component: Register
    }
];