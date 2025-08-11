import axios from 'axios';

/**
 *TODO: This file is a temporary solution for authentication.
 * Once real authentication is integrated into the application, this file should be deleted.
 */
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const getAuthToken = async () => {
    try {
        const response = await axios.post(
            AUTH_URL,
            {},
            {
                headers: {
                    accept: 'application/json'
                }
            }
        );
        const authToken = response.data.token;
        return authToken;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};
