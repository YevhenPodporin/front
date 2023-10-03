import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Network from "./pages/Network";
import Register from "./pages/Register";
import BasicTabs from './pages/Test';

export const privateRoutes = [
    {
        title: "Profile",
        path: '/profile',
        Component: Profile
    },
    {
        title: "Chat",
        path: '/chat',
        Component: Chat
    },
    {
        title: "Network",
        path: '/network',
        Component: Network
    },
    {
        title: "Test",
        path: '/test',
        Component: BasicTabs
    },
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

