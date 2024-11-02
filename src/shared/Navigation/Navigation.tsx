import React, {useEffect, useState} from "react";
import NavigationItem from "./NavigationItem";
import {NAVIGATION_DEMO_2} from "@/data/navigation";
import {useSelector} from "react-redux";
import {getUserToken} from "@/lib/features/user.slice";
import {useRouter} from "next/navigation";

function Navigation() {
    // TODO 경매 등록 role = seller 아니라면 판매자 등록 페이지로 넘어가기
    const userToken = useSelector(getUserToken);
    const [userRole, setUserRole] = useState("");
    const router = useRouter();

    useEffect(() => {
        const role = userToken && userToken.userRole ? userToken.userRole[0] : "ROLE_USER";
        setUserRole(role);
    }, [userToken]);

    const handleRoleCheck = () => {
        router.push(
            !userToken ? '/login' :
                userRole === "ROLE_SELLER" ? '/auction/insert' :
                    '/account-seller'
        );
    };

    return (
        <ul className="nc-Navigation flex items-center">
            {NAVIGATION_DEMO_2.map((item) => {
                if (item.name === "경매 등록") {
                    return (
                        <li key={item.id} onClick={handleRoleCheck}>
                            <NavigationItem menuItem={item} />
                        </li>
                    );
                }
                return <NavigationItem key={item.id} menuItem={item} />;
            })}
        </ul>
    );
}

export default Navigation;