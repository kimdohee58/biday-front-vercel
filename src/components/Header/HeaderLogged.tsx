import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";
import MainNav2LoggedDohee from "@/components/dohee/MainNav2LoggedDohee";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
        {/*<MainNav2Logged />*/}
        <MainNav2LoggedDohee />
    </div>
  );
};

export default HeaderLogged;
