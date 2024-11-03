import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { useSelector } from "react-redux";
import { getUserToken } from "@/lib/features/user.slice";
import { useRouter } from "next/navigation";

function Navigation() {
    const userToken = useSelector(getUserToken);
    const [userRole, setUserRole] = useState("");
    const router = useRouter();

    useEffect(() => {
        console.log(userToken?.userRole?.[0])
        setUserRole(userToken?.userRole?.[0] || "null")
    }, []);

    const handleRoleCheck = () => {
        if (userRole === "null") {
            router.push('/login');
        } else if (userRole === "ROLE_SELLER") {
            router.push('/auction/insert');
        } else {
            router.push('/account-seller');
        }
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