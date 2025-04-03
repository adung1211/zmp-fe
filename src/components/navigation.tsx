import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation } from "zmp-ui";
import {
  FaHome,
  FaInfoCircle,
  FaBars,
  FaCommentDots,
  FaRegUser,
} from "react-icons/fa";
import { openChat } from "zmp-sdk/apis";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <FaHome className="bottom-nav-icon" />,
  },
  "/info": {
    label: "Tin Tức",
    icon: <FaInfoCircle className="bottom-nav-icon" />,
  },
  "/service": {
    label: "Dịch vụ",
    icon: <FaBars className="bottom-nav-icon" />,
  },
  "/chat": {
    label: "Tin nhắn",
    icon: <FaCommentDots className="bottom-nav-icon" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <FaRegUser className="bottom-nav-icon" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  const handleNavigation = async (path: string) => {
    if (path === "/chat") {
      try {
        await openChat({
          type: "oa",
          id: "1473982290596396554",
          message: "Xin Chào",
        });
      } catch (error) {
        console.log("Failed to open chat:", error);
      }
    } else {
      navigate(path);
    }
  };
  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={location.pathname}
      onChange={handleNavigation}
      className="z-50 custom-bottom-nav"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={<span className="bottom-nav-label">{tabs[path].label}</span>}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
        />
      ))}
    </BottomNavigation>
  );
};