"use client";

import { useRef } from "react";
import { AppStore, makeStore } from "@/redux/store";
import { Provider } from 'react-redux';

export function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(undefined as any);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    );
}