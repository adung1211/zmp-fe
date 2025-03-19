import React, { FC, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { displayDate } from "utils/date";
import { FaEye, FaCalendarAlt, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useNews from "hooks/useNews";
import { parseISOString } from "utils/date";

interface AllNewsSectionProps {
  title: string;
  sortBy?: string;
  category?: string; // Add category prop
}

export const AllNewsSectionContent: FC<AllNewsSectionProps> = ({ title, sortBy, category }) => {
  const { news, loading, error } = useNews({ limit: 10, sortBy: sortBy, category: category });
  const navigate = useNavigate();

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handleViewAllClick = () => {
    if (category) {
      navigate(`/info?tab=${category}`);
    } else if (sortBy === 'view') {
      navigate(`/info?tab=featured`);
    }
    else {
      navigate(`/info?tab=latest`);
    }
  };

  return (
    <Box className="bg-background px-2 py-4 space-y-4">
      <Box className="flex justify-between items-center px-2">
        <Text.Title>{title}</Text.Title>
        <Box onClick={handleViewAllClick} className="cursor-pointer text-primary font-semibold">
          Tất cả
        </Box>
      </Box>
      <Swiper slidesPerView={1.25} spaceBetween={16} className="py-2">
        {news.map((newsItem) => (
          <SwiperSlide key={newsItem._id} onClick={() => handleNewsClick(newsItem._id)}>
            <Box className=" bg-white shadow-md">
              <img src={newsItem.thumbnail_url} alt={newsItem.title} className="w-full h-32 object-cover" />
              <Box className="p-4">
              <Text.Title size="small" className="line-clamp-2 min-h-[2.5rem]">
                {newsItem.title}
              </Text.Title>
                <Box className="flex justify-between items-center mt-2 text-gray-500">
                  <Box className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-zinc-500" />
                    <Text size="xSmall" className="text-zinc-500">
                      {displayDate(parseISOString(newsItem.createdAt))}
                    </Text>
                  </Box>
                  <Box className="flex items-center text-slate-500">
                    <FaEye className="mr-2" />
                    <Text size="small">{newsItem.view} views</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const AllNewsSection: FC<AllNewsSectionProps> = ({ title, sortBy, category }) => {
  return (
    <Suspense>
      <AllNewsSectionContent title={title} sortBy={sortBy} category={category} />
    </Suspense>
  );
};