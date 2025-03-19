import React, { FC, useEffect } from "react";
import { Box, Page, Header } from "zmp-ui";
import NewsTabs from "components/NewsTabs";
import { useNewsTab } from "hooks/useNewsTab";
import AllNews from "./AllNews";

const NewsPage: FC = () => {
  const [tab] = useNewsTab();
  return (
    <Page className="bg-gray-relative flex-1 flex flex-col bg-white ">
      <Header title="Tin Tức"
       className="bg-green text-white"
       />
      
      <NewsTabs />
      <Box className="overflow-x-hidden mt-[-1px] scrollable-content">
        {tab === 'latest' && <AllNews />}
        {tab === 'featured' && <AllNews sortBy="view"/>}
        {tab !== 'latest' && tab !== 'featured' && <AllNews key={tab} category={tab} />}
      </Box>
    </Page>
  );
};

export default NewsPage;