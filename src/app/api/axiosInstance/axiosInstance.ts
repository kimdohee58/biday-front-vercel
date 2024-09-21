import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',  // 서버의 기본 URL 설정
});

// 요청 인터셉터 설정 (로컬스토리지에서 토큰을 가져와 추가)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // 로컬스토리지에서 토큰을 가져오는 로직 이 코드 덕분에 모든 API 요청에 Authorization : Bearer {accessToken"이 헤더에 추가가 됩니다.
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정 (401 응답 시 토큰 재발급)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/refresh', { refreshToken }); // 리프레시 토큰으로 새로운 액세스 토큰 발급
                const newAccessToken = response.data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);// 새로운 토큰을 로컬스토리지에 저장
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;  // 새로운 토큰으로 재요청
                return axiosInstance(error.config); // 원래 요청을 다시 보냄
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
