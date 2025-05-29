import { Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth.jsx';

export const useApi = () => {
    const { token, logout, auth } = useAuth();

    const fetchWithAuth = async (url, options = {}) => {
        console.log(auth, token)
        const headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };

        if (auth.token) {
            headers['Authorization'] = `Bearer ${auth.token}`;
            if(auth.loginMethod === 'custom-jwt') {
                headers['old-auth'] = `custom-jwt`;
            } else {
                headers['new-auth'] = `keycloak`;
            }
            console.log(headers);
        }
        
        try {
            const response = await fetch(url, {
               ...options,
               headers,
            });
       
            if (response && !response.ok && response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.error('Unauthorized access');
                // You might want to trigger a logout here depending on your app's flow
               logout();//needs better handling
            }
            
            return response;
        } catch (error) {
            console.log('error',error);
           // logout();//needs better handling
        }

    };

    return { fetchWithAuth };
};