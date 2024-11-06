import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import {CustomLink} from "@/data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/", label: "Release Notes" },
      { href: "/", label: "Upgrade Guide" },
      { href: "/", label: "Browser Support" },
      { href: "/", label: "Dark Mode" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/", label: "Prototyping" },
      { href: "/", label: "Design systems" },
      { href: "/", label: "Pricing" },
      { href: "/", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "/", label: "Best practices" },
      { href: "/", label: "Support" },
      { href: "/", label: "Developers" },
      { href: "/", label: "Learn design" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "/", label: "Discussion Forums" },
      { href: "/", label: "Code of Conduct" },
      { href: "/", label: "Contributing" },
      { href: "/", label: "API Reference" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu) => {
    return (
        <div key={menu.id} className="text-sm">
          <h3 className="font-bold">{menu.title}</h3>
          <ul>
            {menu.menus.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-600 hover:underline">
                    {link.label}
                  </a>
                </li>
            ))}
          </ul>
        </div>
    );
  };

  return (
      <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          <div className="flex flex-col items-center md:items-start">
            <Logo className="mb-4" />
            <SocialsList1 className="flex space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>

          {/* 푸터 비즈니스 정보 */}
          <div className="footer-info lg:flex lg:flex-col lg:col-span-2 p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">비즈니스 정보</h4>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <strong>회사명:</strong> <span className="text-gray-800">BiDay 주식회사</span>
            </div>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <strong>대표:</strong> <span className="text-gray-800">송준한</span> / <strong>회장:</strong> <span className="text-gray-800">설유정</span> / <strong>이사:</strong> <span className="text-gray-800">김도희</span> / <strong>임원:</strong> <span className="text-gray-800">김영우</span> / <strong>팀장:</strong> <span className="text-gray-800">정휘재</span>
            </div>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <strong>사업자등록번호:</strong> <span className="text-gray-800">570-88-01618</span>
            </div>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <a
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=5708801618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline transition duration-300"
              >
                사업자정보확인
              </a>
            </div>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <strong>통신판매업:</strong> <span className="text-gray-800">제 2021-성남분당C-0093호</span>
            </div>
            <div className="footer-item text-sm text-gray-600 mb-2">
              <strong>사업장소재지:</strong> <span className="text-gray-800">서울 강남구 강남대로94길 20 삼오빌딩 5층 (역삼동) 819-3</span>
            </div>
            <div className="footer-item text-sm text-gray-600">
              <strong>호스팅 서비스:</strong> <span className="text-gray-800">네이버 클라우드 ㈜</span>
            </div>
          </div>

          {/* 보증 안내 및 통신판매 중개자 안내 */}
          <div className="notice_guarantee lg:flex lg:flex-col lg:col-span-2 mt-6 lg:mt-0 p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">보증 안내</h4>
            <p className="title text-sm font-bold text-gray-600 mb-1">
              신한은행 채무지급보증 안내
            </p>
            <p className="description text-sm text-gray-600 mb-4">
              당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
              <a href="#" className="link_guarantee text-blue-600 hover:underline transition duration-300"> 서비스가입 사실 확인</a>
            </p>

            {/* 통신판매 중개자 안내 */}
            <div className="notice_area mt-4">
              <p className="notice text-sm text-gray-600 mb-2">
                비데이(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은 각 판매자에게 있습니다.
                단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고 보증하는 내용에 대한 책임은 비데이(주)에 있습니다.
              </p>
              <p className="copyright text-sm text-gray-600">© BiDay Corp.</p>
            </div>
          </div>

        </div>
      </div>
  );
};


export default Footer;