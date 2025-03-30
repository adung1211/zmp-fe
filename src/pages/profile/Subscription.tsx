import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useAuth } from "hooks";
import { authorize } from "zmp-sdk/apis";
import { RiLoginCircleFill } from "react-icons/ri";

const Subscription: FC = () => {
  const { login } = useAuth();

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
      console.log("authorize error:", error);
    }
  };

  return (
    <Box className="m-4" onClick={authorizeUser}>
      <Box
        className="bg-emerald-600 text-white rounded-xl p-4 space-y-2"
        style={{
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

export default Subscription;