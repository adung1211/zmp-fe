import React, { FC } from "react";
import { Box, Header, Icon, Page, Text, Button } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented, useAuth } from "hooks";
import { useRecoilCallback } from "recoil";
import { userState } from "state";

import { authorize } from "zmp-sdk/apis";
import { getUserInfo, saveImageToGallery, openShareSheet } from "zmp-sdk/apis";

import { useRecoilState } from "recoil";
import { authAtom } from "state";

import logoOA from "static/logoOA.png";
import qr from "static/qr.jpg";
import logo from "static/logo.png";
import { RiLoginCircleFill } from "react-icons/ri";

import { Welcome } from "./index/welcome";

import { createUser, isUserExist } from "api/user";

const Subscription: FC = () => {
  const { login } = useAuth();
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
      try {
        login();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log("authorize error:", error);
    }
    // console.log(await isUserExist("1211"));
    // console.log(await createUser("123", "name", "avatar"));
  };

  return (
    // <Box className="m-4" onClick={authorizeUser}>
    //   <Box
    //     className="bg-green text-white rounded-xl p-4 space-y-2"
    //     style={{
    //       backgroundImage: `url(${subscriptionDecor})`,
    //       backgroundPosition: "right 8px center",
    //       backgroundRepeat: "no-repeat",
    //     }}
    //   >
    //     <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
    //     <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
    //   </Box>
    // </Box>
    <Box className="m-4" onClick={authorizeUser}>
      <Box
        className="bg-emerald-600 text-white rounded-xl p-4 space-y-2"
        style={{
          // backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box flex>
          <Box>
            <Text.Title className="flex-1 items-center font-semibold">
              Đăng ký thành viên
            </Text.Title>
            <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
          </Box>
          <RiLoginCircleFill className="text-4xl ml-auto" />
        </Box>
      </Box>
    </Box>
  );
};

const Personal: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Chỉnh sửa thông tin
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
                  Khác
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
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text className="flex-1 items-center text-sm">
                  Quan tâm OA để nhận các thông báo mới
                </Text>
              </Box>
            ),
          },
          {
            left: <img src={logoOA} className="h-7 w-7 mt-1" />,
            right: (
              <Box flex>
                <Text className="flex-1 items-center font-semibold mt-1">
                  An Tâm Tưới Mini App
                </Text>
                <Button variant="primary" size="small">
                  Quan tâm
                </Button>
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

const QRCode: FC = () => {
  const handleSaveImage = async () => {
    try {
      await saveImageToGallery({
        imageUrl: "https://i.imgur.com/2zEzJ40.png",
        onProgress: (progress) => {
          console.log(progress);
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      const data = await openShareSheet({
        type: "image",
        data: {
          imageUrls: ["https://i.imgur.com/2zEzJ40.png"],
        },
      });
    } catch (err) {}
  };
  return (
    <Box className= "m-4">
      <Box className="bg-white text-center rounded-xl p-4 space-y-2">
        <Text className="text-xs font-light">Chia sẻ mã QR này để giới thiệu ứng dụng tới bạn bè</Text>
        <img src={logo} className="h-12 mx-auto mag" />
        <Text.Title className="font-bold text-base">An Tâm Tưới Mini App</Text.Title>
        <img src={qr} className="h-24 mx-auto mag" />

        <Box className="flex justify-center space-x-20 pt-4">
          <Button className="text-xs" variant="secondary" size="medium" onClick={handleSaveImage}>Lưu ảnh<Icon icon="zi-download" className="ml-2"/></Button>
          <Button className="text-xs" variant="secondary" size="medium" onClick={handleShare}>Chia sẻ<Icon icon="zi-share-external-2" className="ml-2"/></Button>
      </Box>
      </Box>
    </Box>
  );
};

const ProfilePage: FC = () => {
  const { user } = useAuth();
  return (
    <Page>
      {user && <Welcome />}
      {!user && <Header showBackIcon={false} title="&nbsp;" />}
      {!user && <Subscription />}
      <Personal />
      <Other />
      <QRCode/>
    </Page>
  );
};

export default ProfilePage;
