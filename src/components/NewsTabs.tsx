import React, { FC } from "react";
import { Box, Tabs, Text } from "zmp-ui";
import { useNewsTab } from "hooks/useNewsTab";

const NewsTabs: FC = () => {
  const [tab, setTab] = useNewsTab();

  const handleTabChange = (value: string) => {
    setTab(value as 'latest' | 'featured');
  };

  return (
    <Box className="bg-white shadow-md">
      <Tabs activeKey={tab} onChange={handleTabChange} className="px-4">
        <Tabs.Tab key="latest" label={<Text>Tin mới nhất</Text>}/>
        <Tabs.Tab key="featured" label={<Text>Tin nổi bật</Text>}/>
      </Tabs>
    </Box>
  );
};

export default NewsTabs;