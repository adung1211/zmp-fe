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

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const NewsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsItems = useRecoilValue(newsState);
  const newsItem = newsItems.find((item) => item.id === parseInt(id ?? "0"));

  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: "User1", text: "This is a great article!" },
    { id: 2, author: "User2", text: "Thanks for sharing." },
  ]);

  const commentCount = Math.floor(Math.random() * 100);
  const likeCount = Math.floor(Math.random() * 500);
  const viewCount = newsItem ? newsItem.view : 0;

  const [newComment, setNewComment] = useState("");
  const currentUser = "CurrentUser"; // Replace with actual user

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        author: currentUser,
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  if (!newsItem) {
    return <Text>News not found</Text>;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${currentUser}&background=random&size=32`;

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header
        className="app-header no-border flex-none pl-4 text-white bg-green"
        title="Chi tiết tin tức"
      />
      <Box className="overflow-y-auto scrollable-content">
        <Box className="pb-4">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-64 object-cover"
          />
          <Text.Title size="large" className="mt-3 px-3">
            {newsItem.title}
          </Text.Title>
          <Box className="flex flex-wrap mt-3 px-3">
            {newsItem.tags.map((tag) => (
              <Box
                key={tag.id}
                className="bg-slate-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {tag.name}
              </Box>
            ))}
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
                isLiked ? "text-red-500 border-red-400 bg-red-100"
                :
                " border-slate-300 text-slate-300 bg-slate-100"
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
        <Divider />

        <Box className="p-2">
          <Text.Title
          className="mb-2"
          >Comments</Text.Title>
          {comments.map((comment) => (
            <Box key={comment.id} className="mb-2 p-2 bg-slate-100 rounded-md flex items-start">
              <img
                src={`https://ui-avatars.com/api/?name=${comment.author}&background=random&size=32`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2 mt-1"
              />
              <Box>
                <Text size="small" className="font-semibold">
                  {comment.author}
                </Text>
                <Text>{comment.text}</Text>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box className="mt-4 px-2 flex items-center m-2">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <Box className="border border-slate-300
           rounded-lg flex-1 flex items-center">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              className="border-none flex-1"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommentSubmit();
                }
              }}
            />
            <Box
              className="cursor-pointer text-slate-500"
              onClick={handleCommentSubmit}
            >
              <FaPaperPlane className="text-xl mr-3" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default NewsDetail;