import React, { FC, useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Page, Header, Select } from "zmp-ui";
import NewsTabs from "components/NewsTabs";
import { useNewsTab } from "hooks/useNewsTab";
import AllNews from "./AllNews";
import SearchInput from "./SearchInput";

const NewsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab] = useNewsTab();
  const [searchTerm, setSearchTerm] = useState("");
  const sortByParam = searchParams.get("sortBy") || "latest";
  const [sortBy, setSortBy] = useState(sortByParam);


  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <Page className="bg-gray relative flex-1 flex flex-col bg-white">
      <Header
        title="Tin Tức"
        className="bg-green-700 text-white"
      />
      <SearchInput
        onSearch={handleSearch}
        onSortChange={handleSortChange}
      />
      <NewsTabs />
      <Box className="overflow-x-hidden mt-[-1px] scrollable-content">
        {tab === "all" && (
          <AllNews
            key={"all" + "-" + searchTerm}
            sortBy={sortBy}
            searchTerm={searchTerm}
          />
        )}
        {tab === "liked" && (
          <AllNews
            key={"liked" + "-" + searchTerm}
            category="liked"
            sortBy={sortBy}
            searchTerm={searchTerm}
          />
        )}
        {tab === "recommendations" && (
          <AllNews
            key={"recommendations" + "-" + searchTerm}
            category="recommendations"
            sortBy={sortBy}
            searchTerm={searchTerm}
          />
        )}
        {tab !== "all" && tab !== "liked" && tab !== "recommendations" && (
          <AllNews
            key={tab + "-" + searchTerm}
            category={tab}
            sortBy={sortBy}
            searchTerm={searchTerm}
          />
        )}
      </Box>
    </Page>
  );
};

export default NewsPage;