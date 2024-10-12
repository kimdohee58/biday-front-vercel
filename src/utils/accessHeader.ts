//src/utils/accessHeader.ts
import { headers } from 'next/headers';

export const getAuthorizationHeader = () => {
    const headersList = headers();
    const authorizationToken = headersList.get("Authorization") || '';
    return authorizationToken;
};
