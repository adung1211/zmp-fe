import React, { FC, useEffect } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useToBeImplemented, useAuth } from "hooks";
import logoOA from "static/logoOA.png";

import { followOA, getUserInfo} from "zmp-sdk/apis";

const Personal: FC = () => {
  const [following, setFollowing] = React.useState(false);
  const { user } = useAuth();
  const onClick = useToBeImplemented();

  const isFollowedOA = async () => {
     try {
        const data = await getUserInfo({});
        console.log("isFollowedOA data:", data);
        return data?.userInfo?.followedOA == true;
      } catch (error) {
        console.log("isFollowedOA Error:", error);
      }
    
      return false;
  };

  const follow = async () => {
    try {
      await followOA({
        id: "1473982290596396554",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  useEffect(() => {
    const checkFollowedOA = async () => {
      const followed = await isFollowedOA();
      setFollowing(followed);
    };
    checkFollowedOA();
  }, []);

  return (
    <Box>
      <Box className="border-t border-b border-zinc-300 mb-4">
        <Box 
          className=" flex items-center p-4 space-x-4 cursor-pointer" 
          onClick={onClick}
        >
          <Icon icon="zi-user" />
          <Box flex className="flex-1">
            <Text.Header className="flex-1 items-center font-normal">
              Chỉnh sửa thông tin
            </Text.Header>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>
        
        <Box className="h-[1px] bg-zinc-200 mx-4" />
        
        <Box 
          className="flex items-center p-4 space-x-4 cursor-pointer" 
          onClick={onClick}
        >
          <Icon icon="zi-clock-2" />
          <Box flex className="flex-1">
            <Text.Header className="flex-1 items-center font-normal">
              Khác
            </Text.Header>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>

        <Box className="h-[1px] bg-zinc-200 mx-4" />
        
        <Box 
          className="flex items-center p-4 space-x-4" 
        >
          <Icon icon="zi-star" />
          <Box flex className="flex-1">
            <Text className="flex-1 items-center text-sm">
              Quan tâm OA để nhận các thông báo mới
            </Text>
          </Box>
        </Box>
        
        {/* <Box className="h-[1px] bg-zinc-200 mx-4" /> */}

        <Box 
          className="flex items-center p-4 space-x-4"
        >
          <img src={logoOA} className="h-7 w-7" />
          <Box flex className="flex-1">
            <Text className="flex-1 items-center font-semibold">
              An Tâm Tưới Mini App
            </Text>
          </Box>
          {(!user || !following) &&(
          <Button variant="primary" size="small" onClick={follow}>
            Quan tâm
          </Button>
          )}
          {user && following &&(
            <Button variant="primary" size="small" disabled={true}>
                Đã quan tâm
            </Button>
          )}
          
        </Box>
    </Box>
    
    </Box>
  );
};

export default Personal;