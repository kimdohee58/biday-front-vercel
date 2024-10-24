import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductImage, setLoading, setError } from '@/lib/features/products.slice';
import { RootState } from '@/lib/store';
import {fetchProducts} from "@/service/product/product.service";

const ProductPage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.product);
    useEffect(() => {
        const loadProducts = async () => {
            console.log("dispatch : " , dispatch)
            dispatch(setLoading(true)); // 로딩 시작
            try {
                const searchFilter = { category: 'all' }; // 필요에 따라 필터 설정
                console.log("searchFilter : " , searchFilter)

                const products = await fetchProducts(searchFilter) || []; // undefined일 경우 빈 배열로 처리
                console.log("products : " , products)

                dispatch(setProductImage(products)); // Redux 스토어에 저장
                console.log("dispatch : " , dispatch)

            } catch (error) {
               // console.log("캐치 블록에 있는지 확인하는 코드 : ", error);
                dispatch(setError("상품 데이터를 가져오는 데 오류가 발생했습니다."));
            } finally {
                dispatch(setLoading(false)); // 로딩 종료
            }
        };

        loadProducts();
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductPage;
