//src/service/user/login.api.ts
export const handleLogin = async (username: string, password: string): Promise<Response> => {
    try {
        // JSON 형태로 데이터를 준비
        const body = JSON.stringify({
            email: username,
            password: password,
        });

        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Content-Type을 JSON으로 설정
            },
            body: body,  // JSON 데이터를 바디에 포함
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
