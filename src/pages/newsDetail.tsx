import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newsState } from "state";
import { Box, Text, Input, Button } from "zmp-ui";
import { displayDate } from "utils/date";
import { Header, Page } from "zmp-ui";
import { FaHeart, FaComment, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Divider } from "components/divider";
import { useAuth } from "hooks";
import useNewsDetail from "hooks/useNewsDetail";

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const NewsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsItems = useRecoilValue(newsState);

  // Call useAuth unconditionally
  const { user } = useAuth();

  const {
    newsItem,
    isLiked,
    likeCount,
    comments,
    loading,
    error,
    handleLikeClick,
    handleCommentSubmit,
  } = useNewsDetail({ newsItemId: id });

  const commentCount = Math.floor(Math.random() * 100);
  const viewCount = newsItem ? newsItem.view : 0;

  const [newComment, setNewComment] = useState("");
  const currentUser = user?.name || "Guest";

  const onCommentSubmit = () => {
    if (newComment.trim() !== "") {
      handleCommentSubmit(newComment);
      setNewComment("");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  if (!newsItem) {
    return <Text>News not found</Text>;
  }

  const avatarUrl =
    user?.avatar ||
    "https://ui-avatars.com/api/?name=GU&background=random&size=56";

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header
        className="app-header no-border flex-none pl-4 text-white bg-green"
        title="Chi tiết tin tức"
      />
      <Box className="overflow-y-auto scrollable-content">
        <Box className="pb-4">
          <img
            src={newsItem.thumbnail_url}
            alt={newsItem.title}
            className="w-full h-64 object-cover"
          />
          <Text.Title size="large" className="mt-3 px-3">
            {newsItem.title}
          </Text.Title>
          <Box className="flex flex-wrap mt-3 px-3">
            {newsItem.tags && Array.isArray(newsItem.tags) ? (
              newsItem.tags.map((tag) => (
                <Box
                  key={tag.id}
                  className="bg-slate-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {tag.name}
                </Box>
              ))
            ) : null}
          </Box>
          <Box className="flex items-center justify-between mt-2 px-3 ">
            <Box>
              <Box className="flex items-center">
                <FaCalendarAlt className="mr-2 text-zinc-500" />
                <Text size="normal" className="text-zinc-500 font-medium">
                  {displayDate(parseDateString(newsItem.created_at))}
                </Text>
              </Box>
              <Box className="flex items-center text-xl mt-3">
                <Box className="flex items-center mr-5 text-blue-500">
                  <FaComment className="mr-2" />
                  <Text size="small" className="text-slate-600 font-medium">
                    {commentCount}
                  </Text>
                </Box>
                <Box className="flex items-center mr-5 text-red-500">
                  <FaHeart className="mr-2" />
                  <Text size="small" className="text-slate-600 font-medium">
                    {likeCount}
                  </Text>
                </Box>
                <Box className="flex items-center text-slate-500">
                  <FaEye className="mr-2" />
                  <Text size="small" className="text-slate-600 font-medium">
                    {viewCount}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              className={`w-12 h-12 mr-2 rounded-full flex items-center justify-center cursor-pointer border  bg-slate-100
                ${
                  isLiked
                    ? "text-red-500 border-red-400 bg-red-100"
                    : " border-slate-300 text-slate-300 bg-slate-100"
                }`}
              onClick={handleLikeClick}
            >
              <FaHeart className="text-xl" />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          className="mt-4 html-content px-2"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
        <Box className="mb-2 px-3 text-right font-bold">
          {newsItem.created_by}
        </Box>

        <Box className="">
          <Text.Title className="p-2">Bình luận</Text.Title>
          <Box className="bg-slate-100 max-h-64 overflow-y-auto scrollable-content py-1">
            {comments.map((comment) => (
              <Box
                key={comment._id}
                className="mb-1 px-2 py-2 flex items-start shadow-sm bg-white"
              >
                <img
                  src={comment.userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2 mt-1"
                />
                <Box>
                  <Box className="">
                    <Text size="small" className="font-bold">
                      {comment.userName}
                    </Text>
                    <Box className="flex items-center">
                      <Text
                        size="xxxSmall"
                        className="text-zinc-500 font-medium"
                      >
                        {displayDate(parseDateString(newsItem.created_at))}
                      </Text>
                    </Box>
                  </Box>
                  <Text size="small" className="mt-[2px]">
                    {comment.content}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="mt-2 px-2 flex items-center m-2">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <Box className="border border-slate-300 rounded-full flex-1 flex items-center px-3">
            <Input
              type="text"
              placeholder="Viết bình luận..."
              value={newComment}
              className="border-none flex-1"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCommentSubmit();
                }
              }}
            />
            <Box
              className="cursor-pointer text-slate-500"
              onClick={onCommentSubmit}
            >
              <FaPaperPlane className="text-xl mr-2" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default NewsDetail;