"use client";
import { ReactNode, JSX } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { reduxStore } from "./index";

persistStore(reduxStore);

/**
 * Redux provider
 * @param {ReactNode} children - children
 * @return {JSX.Element} - Redux provider
 */
export default function ReduxProvider({ children }) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
