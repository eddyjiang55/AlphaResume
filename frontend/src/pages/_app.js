// 导入全局样式
import "@/styles/globals.css";

// 导入 React、AuthProvider 和 Provider
import React from "react";
import { AuthProvider } from "@/components/AuthContext";
import ReduxProvider from "@/store/provider";
import AccountLayout from "./account/layout";
import ResumeLayout from "./resume/layout";
import Layout from "./layout";

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
  } else if (router.pathname.startsWith("/resume")) {
    return (
      <ReduxProvider>
        <AuthProvider>
          <ResumeLayout>
            <Component {...pageProps} />
          </ResumeLayout>
        </AuthProvider>
      </ReduxProvider>
    );
  }
  return (
    <ReduxProvider>
      <AuthProvider> {/* 使用 AuthProvider 包装组件 */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ReduxProvider>
  );
}