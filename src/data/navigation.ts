import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "홈 페이지",
    children: [
      { id: ncNanoId(), href: "/", name: "홈 1 누르면 인덱스 페이지" },
      { id: ncNanoId(), href: "/home-2", name: "홈 2", isNew: true },
      { id: ncNanoId(), href: "/", name: "헤더 1 누르면 인덱스 페이지" },
      { id: ncNanoId(), href: "/home-2", name: "홈 2", isNew: true },
      { id: ncNanoId(), href: "/", name: "곧 출시 예정" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "쇼핑 페이지",
    children: [
      { id: ncNanoId(), href: "/collection", name: "카테코리 페이지" },
      { id: ncNanoId(), href: "/collection-2", name: "카테코리 페이지 2" },
      { id: ncNanoId(), href: "/product-detail", name: "상품 페이지 1" },
      { id: ncNanoId(), href: "/product-detail-2", name: "상품 페이지 2" },
      { id: ncNanoId(), href: "/cart", name: "장바구니" },
      { id: ncNanoId(), href: "/checkout", name: "결제 페이지" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "기타 페이지",
    children: [
      { id: ncNanoId(), href: "/checkout", name: "결제 페이지" },
      { id: ncNanoId(), href: "/search", name: "검색 페이지" },
      { id: ncNanoId(), href: "/cart", name: "장바구니" },
      { id: ncNanoId(), href: "/account", name: "결제 페이지" },
      { id: ncNanoId(), href: "/account-order", name: "결제 페이지" },
      { id: ncNanoId(), href: "/subscription", name: "구독" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "블로그 페이지",
    children: [
      { id: ncNanoId(), href: "/blog", name: "블로그 페이지" },
      { id: ncNanoId(), href: "/blog-single", name: "블로그 싱글" },
      { id: ncNanoId(), href: "/about", name: "페이지 소개 " },
      { id: ncNanoId(), href: "/contact", name: "연락처" },
      { id: ncNanoId(), href: "/login", name: "로그인" },
      { id: ncNanoId(), href: "/signup", name: "회원가입" },
      { id: ncNanoId(), href: "/forgot-pass", name: "비밀번호 찾기" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {

    id: ncNanoId(),
    href: "/",
    name: "홈1 (현재 진행중인 경매)",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "홈2 (마감 입박중인 경매)",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "카테코리 페이지",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/collection",
        name: "카테코리 페이지1",
      },
      {
        id: ncNanoId(),
        href: "/collection-2",
        name: "카테코리 페이지2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/product-detail",
    name: "제품 페이지",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/product-detail",
        name: "제품 상세 페이지",
      },
      {
        id: ncNanoId(),
        href: "/product-detail-2",
        name: "제품 상세 페이지2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/cart",
    name: "장바구니 페이지",
  },
  {
    id: ncNanoId(),
    href: "/checkout",
    name: "결제 페이지",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "검색 페이지",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "마이 페이지",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "고객센터",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/about",
        name: "소개",
      },
      {
        id: ncNanoId(),
        href: "/contact",
        name: "문의하기",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "로그인",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "회원가입",
      },
      {
        id: ncNanoId(),
        href: "/subscription",
        name: "구독",
      },
      { id: ncNanoId(), href: "/forgot-pass", name: "비밀번호 찾기" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "블로그 페이지",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/blog",
        name: "블로그 페이지",
      },
      {
        id: ncNanoId(),
        href: "/blog-single",
        name: "블로그 싱글",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/collection",
    name: "남성",
  },
  {
    id: ncNanoId(),
    href: "/collection-2",
    name: "여성",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "뷰티",
  },

  {
    id: ncNanoId(),
    href: "/collection-2",
    name: "스포츠",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "템플릿",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "탐색",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },
];
