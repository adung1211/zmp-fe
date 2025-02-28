import { Section } from "components/section";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { newsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { displayDate } from "utils/date";
import { FaEye } from "react-icons/fa"; 


const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const LatestContent: FC = () => {
  const newsItems = useRecoilValue(newsState);

  return (
    <Section title="Tin tức mới nhất" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4 py-1">
        {newsItems.map((newsItem) => (
          <SwiperSlide key={newsItem.id}>
            <Box className="p-4 bg-white rounded-lg shadow-md">
              <img src={newsItem.image} alt={newsItem.title} className="w-full h-32 object-cover rounded-md" />
              <Text.Title size="small" className="mt-2 line-clamp-2">
                {newsItem.title}
              </Text.Title>
              <Box className="flex justify-between items-center mt-2 text-gray-500">
                <Text className=" text-s text-slate-500">
                  {displayDate(parseDateString(newsItem.created_at))}
                </Text>
                <Box className="flex items-center">
                  <FaEye className="mr-2" />
                  <Text size="small">{newsItem.view} views</Text>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};


export const Latest: FC = () => {
  return (
    <Suspense>
      <LatestContent />
    </Suspense>
  );
};