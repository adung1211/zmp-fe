import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newsState } from "state";
import { Box, Text } from "zmp-ui";
import { displayDate } from "utils/date";
import { Header, Page } from "zmp-ui";
import ReactHtmlParser from "react-html-parser";

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const NewsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsItems = useRecoilValue(newsState);
  const newsItem = newsItems.find((item) => item.id === parseInt(id ?? '0'));

  if (!newsItem) {
    return <Text>News not found</Text>;
  }

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header className="app-header no-border flex-none pl-4 text-white bg-green" 
       title="Chi tiết tin tức" />
      <Box className="py-4 px-2 overflow-y-auto scrollable-content ">
        <img src={newsItem.image} alt={newsItem.title} className="w-full h-64 object-cover rounded-md" />
        <Text.Title size="large" className="mt-4">
          {newsItem.title}
        </Text.Title>
        <Text className="mt-2 text-slate-500">
          {displayDate(parseDateString(newsItem.created_at))}
        </Text>
        <div className="mt-4 html-content">{ReactHtmlParser(newsItem.content)}</div>
      </Box>
    </Page>
  );
};

export default NewsDetail;