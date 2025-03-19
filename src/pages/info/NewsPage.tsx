import React, { FC, useState, useRef, useEffect } from "react";
import { Box, Page, Header } from "zmp-ui";
import NewsTabs from "components/NewsTabs";
import { useNewsTab } from "hooks/useNewsTab";
import AllNews from "./AllNews";
import SearchInput from "./SearchInput";

const NewsPage: FC = () => {
  const [tab] = useNewsTab();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Page className="bg-gray-relative flex-1 flex flex-col bg-white ">
      <Header title="Tin Tức"
       className="bg-green text-white"
       />
      <SearchInput onSearch={handleSearch} />
      <NewsTabs />
      <Box className="overflow-x-hidden mt-[-1px] scrollable-content">
        {tab === 'latest' && <AllNews key={searchTerm} searchTerm={searchTerm} />}
        {tab === 'featured' && <AllNews key={searchTerm} sortBy="view" searchTerm={searchTerm}/>}
        {tab !== 'latest' && tab !== 'featured' && <AllNews key={searchTerm + tab} category={tab} searchTerm={searchTerm} />}
      </Box>
    </Page>
  );
};

export default NewsPage;