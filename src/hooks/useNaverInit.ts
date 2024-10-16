import React, { useEffect } from 'react';

const NaverLogin = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code && state) {
            handleNaverLogin(code, state);
        }
    }, []);

    const handleNaverLogin = async (code: string, state: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/oauth2/token/naver?code=${code}&state=${state}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Assuming the backend sets the tokens as HttpOnly cookies
            // Redirect to home page or dashboard
            window.location.href = '/';
        } catch (error) {
            console.error('Naver login failed:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const initiateNaverLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const state = Math.random().toString(36).substr(2, 11);
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

        window.location.href = naverAuthUrl;
    };
};

export default NaverLogin;