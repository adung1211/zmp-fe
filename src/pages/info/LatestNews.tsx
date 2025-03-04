import React, { FC, useEffect, useRef, useCallback } from "react";
import { Box, Text } from "zmp-ui";
import { displayDate } from "utils/date";
import { FaCalendarAlt, FaComment, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useNews from "hooks/useNews";

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const LatestNews: FC = () => {
  const navigate = useNavigate();
  const { news, loading, error, loadMore, hasMore } = useNews({ limit: 5 });

  const observer = useRef<IntersectionObserver>();
  const lastNewsElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  return (
    <Box className="overflow-y-auto scrollable-content">
      {news.map((newsItem, index) => {
        const commentCount = newsItem.comment;
        const likeCount = newsItem.like;
        const viewCount = newsItem.view;

        if (index === 0) {
          // First news item (largest)
          return (
            <Box
              key={newsItem.id}
              className="p-4 bg-white shadow-md border-b-2 border-gray border-opacity-15"
              onClick={() => handleNewsClick(newsItem.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={newsItem.thumbnail_url}
                alt={newsItem.title}
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <Text.Title size="large" className="mb-2">
                {newsItem.title}
              </Text.Title>
              <Box className="flex items-center justify-between mb-1 mr-1">
                <Box className="flex items-center">
                  <FaCalendarAlt className="mr-1 text-zinc-500" />
                  <Text size="xSmall" className="text-zinc-500">
                    {displayDate(parseDateString(newsItem.created_at))}
                  </Text>
                </Box>
                <Box className="flex items-center text-zinc-500">
                  <Box className="flex items-center mr-3 text-blue-400">
                    <FaComment className="mr-1" />
                    <Text size="xSmall">{commentCount}</Text>
                  </Box>
                  <Box className="flex items-center mr-3 text-red-400">
                    <FaHeart className="mr-1" />
                    <Text size="xSmall">{likeCount}</Text>
                  </Box>
                  <Box className="flex items-center text-slate-500">
                    <FaEye className="mr-1" />
                    <Text size="xSmall">{viewCount}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        } else {
          // Subsequent news items (smaller, alternating background)
          const bgColor = index % 2 === 0 ? "" : "bg-zinc-100";
          return (
            <Box
              key={newsItem.id}
              className={`p-2 shadow-md flex items-center ${bgColor}`}
              onClick={() => handleNewsClick(newsItem.id)}
              style={{ cursor: "pointer" }}
              ref={news.length === index + 1 ? lastNewsElementRef : null}
            >
              <img
                src={newsItem.thumbnail_url}
                alt={newsItem.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <Box>
                <Text.Title size="small" className="mb-1 line-clamp-3">
                  {newsItem.title}
                </Text.Title>
                <Box className="flex items-center justify-between mb-1 mr-1">
                  <Box className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-zinc-500" />
                    <Text size="xSmall" className="text-zinc-500">
                      {displayDate(parseDateString(newsItem.created_at))}
                    </Text>
                  </Box>
                  <Box className="flex items-center text-zinc-500">
                    <Box className="flex items-center mr-2 text-blue-400">
                      <FaComment className="mr-1" />
                      <Text size="xSmall">{commentCount}</Text>
                    </Box>
                    <Box className="flex items-center mr-2 text-red-400">
                      <FaHeart className="mr-1" />
                      <Text size="xSmall">{likeCount}</Text>
                    </Box>
                    <Box className="flex items-center text-slate-500">
                      <FaEye className="mr-1" />
                      <Text size="xSmall">{viewCount}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }
      })}
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red">{error}</Text>}
    </Box>
  );
};

export default LatestNews;