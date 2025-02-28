import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/index";
import ProfilePage from "pages/profile";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "hooks";
import NewsDetail from "../pages/newsDetail";
import NewsPage from "../pages/info/NewsPage";
import ServicePage from "../pages/service/ServicePage";

import { useAuth } from "hooks";

if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  const { checkLoginOnStart } = useAuth();
  
  useEffect(() => {
    checkLoginOnStart();
  }, []);
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/info" element={<NewsPage />} />
          <Route path='/service' element={<ServicePage />} />
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};