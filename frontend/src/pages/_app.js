// 导入全局样式
import "@/styles/globals.css";

// 导入 React 和 AuthProvider
import React from "react";
import { AuthProvider } from "@/components/AuthContext"; // 确保路径正确

// MyApp 组件
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>  {/* 使用 AuthProvider 包装组件 */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
