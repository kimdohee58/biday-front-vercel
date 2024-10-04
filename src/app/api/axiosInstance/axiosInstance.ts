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

// 토큰,쿠키, 쿠키를 리덕스에 스토어에 저장을 하고 가져오는
// 로컬스토리지가 털릴 위험이 있으니 , 리덕스에 상태 관리를 하는데, 유저 슬라이스가 있잖아.
// 거기에 유저의 정보를 적으면 저장을 하고, 필요하면 취하라는거네, 로컬 스토리지에 넣으면 털리니 / 그래서 리덕스를 스는거고,
// 리덕스에는 로컬 스토리지에 털려도 되는 정보, 리덕스는 애초에 상태 관리를 해야 하기 때문에,
// 리덕스는 상태관리잖아. 그래서 백에서 데이터 가져오잖아. 그거를 맨 처음에 다 갖고와설 ㅣㄷ거스에 잠시 저장하고 임시 보호를 한 다으멩
// 유저가 홈페이지에 들어갔을 때 한번에 적어오ㅓ고, 조금씩 가져오니깐, 리덕스에는 털리면 안되는 정보가 들어가야한다.


// 리덕스도 털릴 위험이 있기 때문에,