import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";

import { useAuth } from "hooks";

export const  Welcome: FC = () => {
  const {user} = useAuth();
  return (
    <Header
      className="app-header no-border flex-none pl-4 text-white bg-green" 
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.avatar || "https://www.citypng.com/public/uploads/preview/black-user-member-guest-icon-701751695037011q8iwf4mjbn.png"}
              alt="User"
            />
            <Box className="flex flex-col pl-2">
            <Text size="normal" className="text-white">
             Xin chào,
            </Text> 
            <Text.Title size="normal" className="text-white">
             {user?.name || "Guest"}
            </Text.Title>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
