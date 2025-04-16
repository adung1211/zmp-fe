import React, { FC, useState } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useToBeImplemented } from "hooks";
import logoOA from "static/logoOA.png";
import { followOA} from "zmp-sdk/apis";

import { saveSession, getSession, clearSession } from "utils/storage";

const Personal: FC = () => {

  const onClick = useToBeImplemented();
  const savedUser = getSession();

  const [trigger, setTrigger] = useState(0);
  
  const follow = async () => {
    try {
      await followOA({
        id: "1473982290596396554",
      });
      const updatedUser = { ...savedUser, followedOA: true };
      saveSession(updatedUser);
      setTrigger(trigger + 1);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button
            variant="primary"
            size="small"
            onClick={!savedUser.followedOA ? follow : undefined}
            disabled={savedUser.followedOA}
          >
            {savedUser.followedOA ? "Đã quan tâm" : "Quan tâm"}
          </Button>
          
        </Box>
    </Box>
    
    </Box>
  );
};

export default Personal;