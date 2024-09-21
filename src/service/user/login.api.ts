export const handleLogin = async (username: string, password: string): Promise<Response> => {
    try {
        const formData = new URLSearchParams();
        formData.append('email', username);
        formData.append('password', password);

        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        if (response.ok) {
            return response;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
