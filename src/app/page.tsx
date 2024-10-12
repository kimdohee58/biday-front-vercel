//src/app/page.tsx

import {getAuthorizationHeader} from "@/utils/accessHeader";
import ClientComponent from "@/app/client-component";

export default function PageHome() {
    const authorizationToken = getAuthorizationHeader();


    return (
            <div>
                <ClientComponent authorizationToken={authorizationToken} />
            </div>
        );
}

