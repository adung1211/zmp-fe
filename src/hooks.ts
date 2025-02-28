import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { matchStatusBarColor } from "utils/device";
import { EventName, events, Payment } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";

import { useRecoilState } from "recoil";
import { authAtom } from "./state";
import { User } from "types/user";
import { saveSession, getSession, clearSession } from "utils/storage";

import { getUserInfo, getSetting } from "zmp-sdk/apis";

export const useAuth = (): {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkLoginOnStart: () => Promise<void>;
} => {
  const [user, setUser] = useRecoilState(authAtom);

  useEffect(() => {
    const savedUser = getSession();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const checkLoginOnStart = async () => {
    try {
      login();
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const settings = await getSetting({});

      if (settings.authSetting?.["scope.userInfo"] == true) {
        try {
          const data = await getUserInfo({});
          const userData = _.pick(data.userInfo, [
            "id",
            "name",
            "avatar",
          ]) as User;
          setUser(userData);
          saveSession(userData);
        } catch (error) {
          console.log("getUserInfo Error:", error);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.log("getSetting Error:", error);
    }
  };

  const logout = async () => {
    setUser(null);
    clearSession();
  };

  return { user, login, logout, checkLoginOnStart };
};

export function useMatchStatusTextColor(visible?: boolean) {
  const changedRef = useRef(false);
  useEffect(() => {
    if (changedRef.current) {
      matchStatusBarColor(visible ?? false);
    } else {
      changedRef.current = true;
    }
  }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detectKeyboardOpen = () => {
      setVisible(window.innerHeight + 160 < originalScreenHeight);
    };
    window.addEventListener("resize", detectKeyboardOpen);
    return () => {
      window.removeEventListener("resize", detectKeyboardOpen);
    };
  }, []);

  return visible;
}

export const useHandlePayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    events.on(EventName.OpenApp, (data) => {
      if (data?.path) {
        navigate(data?.path, {
          state: data,
        });
      }
    });

    events.on(EventName.OnDataCallback, (resp) => {
      const { appTransID, eventType } = resp;
      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", {
          state: resp,
        });
      }
    });

    events.on(EventName.PaymentClose, (data = {}) => {
      const { zmpOrderId } = data;
      navigate("/result", {
        state: { data: { zmpOrderId } },
      });
    });
  }, []);
};

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
}
