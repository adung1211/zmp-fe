import React, { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { ListRenderer } from "../../components/list-renderer";
import { useToBeImplemented } from "hooks";
import logoOA from "static/logoOA.png";

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

export default Other;