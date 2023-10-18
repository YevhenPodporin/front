import { toast } from 'react-toastify';


export default function transformErrorResponse(baseQueryReturnValue: any) {
    if (baseQueryReturnValue.status === 401) {
        localStorage.removeItem('token');
        window.location.replace('/login');
    }
    if (baseQueryReturnValue && baseQueryReturnValue.data.errors) {
        toast.error(baseQueryReturnValue.data.errors)
        return baseQueryReturnValue.data.errors
    }
};