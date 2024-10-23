//src/features/auth/ClientReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import TokenCheck from "@/components/TokenCheck"; // 기존에 전역으로 생성된 store 사용

const ClientReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TokenCheck />
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ClientReduxProvider;
