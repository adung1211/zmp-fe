import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented, useAuth } from "hooks";
import { useRecoilCallback } from "recoil";
import { userState } from "state";

import { authorize } from "zmp-sdk/apis";
import { getUserInfo } from "zmp-sdk/apis";

import { useRecoilState } from "recoil";
import { authAtom } from "state";

const Subscription: FC = () => {
  const {login} = useAuth();
  // const requestUserInfo = useRecoilCallback(
  //   ({ snapshot }) =>
  //     async () => {
  //       const userInfo = await snapshot.getPromise(userState);
  //       console.warn("Các bên tích hợp có thể sử dụng userInfo ở đây...", {
  //         userInfo,
  //       });
  //     },
  //   []
  // );

  const authorizeUser = async () => {
    try {
      const data = await authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      });
      try{
        login();
      }
      catch(error){
        console.log(error);
      }
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log("authorize error:", error);
    }
  };

  return (
    <Box className="m-4" onClick={authorizeUser}>
      <Box
        className="bg-green text-white rounded-xl p-4 space-y-2"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
        <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
      </Box>
    </Box>
  );
};

const Personal: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Thông tin tài khoản
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Đánh giá đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Logged: FC = () => {
  const [user, setUser] = useRecoilState(authAtom);
  return (
    <Box className="m-4">
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                    {user?.name}
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  const { user } = useAuth();
  return (
    <Page>
      <Header showBackIcon={false} title="&nbsp;" />
      {!user && <Subscription />}
      {user && <Logged />}
      <Personal />
      <Other />
    </Page>
  );
};

export default ProfilePage;
