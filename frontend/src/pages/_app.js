// 导入全局样式
import "@/styles/globals.css";

// 导入 React、AuthProvider 和 Provider
import React from "react";
import { AuthProvider } from "@/components/AuthContext";
import ReduxProvider from "@/store/provider";
import AccountLayout from "./account/layout";

// MyApp 组件
export default function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith("/account")) {
    return (
      <ReduxProvider>
        <AuthProvider>
          <AccountLayout>
            <Component {...pageProps} />
          </AccountLayout>
        </AuthProvider>
      </ReduxProvider>
    );
  }
  return (
    <ReduxProvider>
      <AuthProvider> {/* 使用 AuthProvider 包装组件 */}
        <Component {...pageProps} />
      </AuthProvider>
    </ReduxProvider>
  );
}