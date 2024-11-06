import React, {useEffect, useState} from "react";
import NavigationItem from "./NavigationItem";
import {NAVIGATION_DEMO_2} from "@/data/navigation";
import {useSelector} from "react-redux";
import {getUserToken} from "@/lib/features/user.slice";

function Navigation() {
    const userToken = useSelector(getUserToken);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        setUserRole(userToken?.userRole?.[0] || "null");
    }, [userToken]);

    // todo 경매 등록 옵션 불러오기 안됨
    const getDynamicHref = () => {
        console.log("getDynamicHref");
        if (userRole === "null") {
            return '/login';
        } else if (userRole === "ROLE_SELLER") {
            return '/auction/insert';
        } else {
            return '/account-seller';
        }
    };

    return (
        <ul className="nc-Navigation flex items-center whitespace-nowrap">
            {NAVIGATION_DEMO_2.map((item) => {
                const updatedItem = {...item};

                if (item.name === "경매 등록") {
                    updatedItem.href = getDynamicHref(); // 권한 체크를 통해 href 동적 설정
                }

                return (
                    <li key={item.id}>
                        <NavigationItem menuItem={updatedItem}/>
                    </li>
                );
            })}
        </ul>
    );
}

export default Navigation;