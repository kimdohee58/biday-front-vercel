// strategy cache 확인
import {strategy} from "@/api/api.strategy";
import {RequestOptions} from "@/model/api/RequestOptions";
import {api} from "@/api/request";

const cacheTest = async () => {
    const options: RequestOptions<any, null> = {
        cache: {revalidate: 3}
    };
    return await strategy.GET(`${api.brand}`, options);
};

export const testAPI = {
    cacheTest,
}