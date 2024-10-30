import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
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
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">

      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
// import Logo from "@/shared/Logo/Logo";
// import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
// import { CustomLink } from "@/data/types";
// import React from "react";
//
// export interface WidgetFooterMenu {
//   id: string;
//   title: string;
//   menus: CustomLink[];
// }
//
// const widgetMenus: WidgetFooterMenu[] = [
//   {
//     id: "5",
//     title: "Getting started",
//     menus: [
//       { href: "/", label: "Release Notes" },
//       { href: "/", label: "Upgrade Guide" },
//       { href: "/", label: "Browser Support" },
//       { href: "/", label: "Dark Mode" },
//     ],
//   },
//   {
//     id: "1",
//     title: "Explore",
//     menus: [
//       { href: "/", label: "Prototyping" },
//       { href: "/", label: "Design systems" },
//       { href: "/", label: "Pricing" },
//       { href: "/", label: "Security" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Resources",
//     menus: [
//       { href: "/", label: "Best practices" },
//       { href: "/", label: "Support" },
//       { href: "/", label: "Developers" },
//       { href: "/", label: "Learn design" },
//     ],
//   },
//   {
//     id: "4",
//     title: "Community",
//     menus: [
//       { href: "/", label: "Discussion Forums" },
//       { href: "/", label: "Code of Conduct" },
//       { href: "/", label: "Contributing" },
//       { href: "/", label: "API Reference" },
//     ],
//   },
// ];
//
// const Footer: React.FC = () => {
//   const renderWidgetMenuItem = (menu: WidgetFooterMenu) => {
//     return (
//         <div key={menu.id} className="text-sm">
//           <h3 className="font-bold">{menu.title}</h3>
//           <ul>
//             {menu.menus.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-gray-600 hover:underline">
//                     {link.label}
//                   </a>
//                 </li>
//             ))}
//           </ul>
//         </div>
//     );
//   };
//
//   return (
//       <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
//         <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
//           <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
//             <div className="col-span-2 md:col-span-1">
//               <Logo />
//             </div>
//             <div className="col-span-2 flex items-center md:col-span-3">
//               <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
//             </div>
//           </div>
//
//           {/* 푸터 비즈니스 정보 */}
//           <div className="footer-info lg:flex lg:flex-col lg:col-span-2">
//             <div className="footer-item text-sm">회사명: biday 주식회사</div>
//             <div className="footer-item text-sm">대표: 송준한/회장: 설유정/이사: 김도희/임원: 김영우/팀장: 정휘재 </div>
//             <div className="footer-item text-sm">사업자등록번호: 570-88-01618</div>
//             <div className="footer-item text-sm">
//               <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=5708801618" target="_blank" rel="noopener noreferrer">사업자정보확인</a>
//             </div>
//             <div className="footer-item text-sm">통신판매업: 제 2021-성남분당C-0093호</div>
//             <div className="footer-item text-sm">사업장소재지: 서울 강남구 강남대로94길 20 삼오빌딩 5층 (역삼동) 819-3</div>
//             <div className="footer-item text-sm">호스팅 서비스: 네이버 클라우드 ㈜</div>
//           </div>
//
//           {/* 보증 안내 및 통신판매 중개자 안내 */}
//           <div className="notice_guarantee lg:flex lg:flex-col lg:col-span-2">
//             <p className="title text-sm font-bold">신한은행 채무지급보증 안내</p>
//             <p className="description text-sm">
//               당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
//               <a href="#" className="link_guarantee text-blue-600 hover:underline"> 서비스가입 사실 확인</a>
//             </p>
//
//             {/* 통신판매 중개자 안내 */}
//             <div className="notice_area mt-4">
//               <p className="notice text-sm">
//                 비데이(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은 각 판매자에게 있습니다.
//                 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고 보증하는 내용에 대한 책임은 비데이(주)에 있습니다.
//               </p>
//               <p className="copyright text-sm">© biday Corp.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };
//
// export default Footer;
