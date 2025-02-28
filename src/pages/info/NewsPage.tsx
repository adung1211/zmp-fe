import React, { FC } from "react";
import { Box, Page, Header } from "zmp-ui";
import NewsTabs from "components/NewsTabs";
import LatestNews from "./LatestNews";
import FeaturedNews from "./FeaturedNews";
import { useNewsTab } from "hooks/useNewsTab";

const NewsPage: FC = () => {
  const [tab] = useNewsTab();

  return (
    <Page className="bg-gray-relative flex-1 flex flex-col bg-white ">
      <Header title="Tin Tức"
       className="bg-green text-white"
       />
      
      <NewsTabs />
      <Box className="overflow-x-hidden mt-[-1px] scrollable-content">
        {tab === 'latest' && <LatestNews />}
        {tab === 'featured' && <FeaturedNews />}
      </Box>
    </Page>
  );
};

export default NewsPage;