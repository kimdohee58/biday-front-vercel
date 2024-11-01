import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import {Route} from "next";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "홈 페이지",
    children: [
      { id: ncNanoId(), href: "/search", name: "검색 페이지" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "쇼핑 페이지",
    children: [
      { id: ncNanoId(), href: "/account-order", name: "주문 내역" },
      { id: ncNanoId(), href: "/account-savelists", name: "위시리스트" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "기타 페이지",
    children: [
      { id: ncNanoId(), href: "/checkout", name: "결제 페이지" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "블로그 페이지",
    children: [
      { id: ncNanoId(), href: "/about", name: "페이지 소개 " },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/dohee/auction/ongoing",
    name: "진행 중인 경매",
  },
  {
    id: ncNanoId(),
    href: "/dohee/auction/last-chance",
    name: "마감 임박 경매",
  }
  ,
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
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/outer" as Route,
    name: "Outer",
  },
  {
    id: ncNanoId(),
    href: "/top" as Route,
    name: "Top",
  },
  {
    id: ncNanoId(),
    href: "/bottom" as Route,
    name: "Bottom",
  },
  {
    id: ncNanoId(),
    href: "/acc" as Route,
    name: "Acc",
  },

  // {
  //   id: ncNanoId(),
  //   href: "/collection" as Route,
  //   name: "템플릿",
  //   type: "megaMenu",
  //   children: MEGAMENU_TEMPLATES,
  // },

  {
    id: ncNanoId(),
    href: "/search",
    name: "탐색",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "고객센터",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/contact",
        name: "문의하기",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "회원가입",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/auction/insert",
    name: "경매 등록"
  },
];
