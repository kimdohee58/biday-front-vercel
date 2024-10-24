import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { useSelector } from "react-redux";
import { getUserToken } from "@/lib/features/user.slice";

function Navigation() {
    const userToken = useSelector(getUserToken);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const role = userToken && userToken.userRole ? userToken.userRole[0] : "ROLE_USER";
        setUserRole(role);
    }, [userToken]);

    return (
        <ul className="nc-Navigation flex items-center">
            {NAVIGATION_DEMO_2.map((item) => {
                if (item.name === "경매 등록" && userRole === "ROLE_SELLER") {
                    return <NavigationItem key={item.id} menuItem={item} />;
                }
                if (item.name !== "경매 등록") {
                    return <NavigationItem key={item.id} menuItem={item} />;
                }
                return null;
            })}
        </ul>
    );
}

export default Navigation;