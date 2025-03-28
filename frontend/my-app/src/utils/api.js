import { useAuth } from '../hooks/useAuth.jsx';

export const useApi = () => {
    const { token } = useAuth();

    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
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
            }
            console.log(response,'ffffffffffffffffffff');
            return response;
        } catch (error) {
            console.log(error);
        }

    };

    return { fetchWithAuth };
};