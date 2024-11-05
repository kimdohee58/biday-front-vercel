export const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    content: "고객을 생각한 서비스와 퀄리티 높은 제품, 믿고 구매해도 좋아요!"
        .split(",")
        .join(",<br />"),  // ',' 기준 줄바꿈
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    content: "좋은 품질과 착한 가격, 빠르고 친절한 배송까지 모두 만족스러워요!"
        .split(",")
        .join(",<br />"),  // ',' 기준 줄바꿈
  },
  {
    id: 3,
    clientName: "유*환",
    content: "퀄리티, 가격, 배송 속도 모두 만족스러워요! 재구매 의사 100%입니다."
        .split("!")
        .join("!<br />"),  // '!' 기준 줄바꿈
  },
];
