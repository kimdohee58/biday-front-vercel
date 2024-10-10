export async function savePaymentTemp(
    paymentTemp: PaymentTempModel
) {
    const userToken = Cookies.get("userToken")!!;
    const token = Cookies.get("token")!!;

    const requestOptions = {
        data: paymentTemp,
        token: token,
        userToken: userToken,
    }

    try {
        return await paymentAPI.savePaymentTemp(requestOptions);
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// 에이피아니느 패치에 넘겨줘서 하는거고
// 서비스는 수정 같은거 할 때만 사용하는거다.
// 데이터 변환을
// 인수로 받ㅇ느걸 서비스에서 리퀘스트옵션으로 전달해서 바꿔야 한다. <서비스>에서
// 만약에 토큰, 바디 다 필요 없다.



// 토큰이랑, 바디가 필요 없으면,
// 리퀘스트 옵션에 파람만 넣어서 사용하면 된다.