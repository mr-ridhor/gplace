'use client';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import { google } from 'googleapis';

const Page = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code'); // Ensure the query parameter name is correct

    useEffect(() => {
        const fetchAuthToken = async () => {
            if (code) {
                try {
                    const response = await axios.post('/api/auth/outlook/callback', { code });
                    if (response.status == 200) {
                        console.log('API Response:', response.data);
                    } else {
                        console.error('Error response:', response);
                    }
                    
                } catch (error) {
                    console.error('Error fetching auth token:', error);
                }
            }
        };

        fetchAuthToken();
    }, []); 
    
    // Include `code` as a dependency to trigger the effect only when `code` changes

    return (
        <div>
            <h1>Successful!</h1>
        </div>
    );
};

export default Page;
