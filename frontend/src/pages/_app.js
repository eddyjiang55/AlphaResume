// 导入全局样式
import "@/styles/globals.css";

// 导入 React、AuthProvider 和 Provider
import React from "react";
import { AuthProvider } from "@/components/AuthContext"; // 确保路径正确
import { Provider } from 'react-redux';
import store from "../store";

// MyApp 组件
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider> {/* 使用 AuthProvider 包装组件 */}
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}