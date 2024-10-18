// src/utils/headers.ts

export const HTTPRequest = (token: string) => {
    const userToken = JSON.parse(token);
    if (!userToken) throw new Error("UserToken 부재");

    try {
        const userRole = userToken.userRole[0]; // 첫 번째 요소가 없으면 null
        const {role: _, ...restUserToken} = userToken;
        return encodeURIComponent(JSON.stringify({...restUserToken, userRole}))
    } catch (error) {
        throw new Error("userRole 부재");
    }
};


