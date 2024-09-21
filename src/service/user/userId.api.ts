const API_BASE_URL = 'http://211.188.54.218:8080/users';

export const getUserById = async (id: number): Promise<UsersModel> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return await response.json();
};
