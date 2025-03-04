import { useState, useEffect } from "react";
import axios from "axios";
import { NewsItem } from "types/news";
import { Comment } from "types/comment";
import { useAuth } from "hooks";

const API_URL = import.meta.env.VITE_API_URL;

interface UseNewsDetailProps {
  newsItemId: string | undefined;
}



const useNewsDetail = ({ newsItemId }: UseNewsDetailProps) => {
  const [newsItem, setNewsItem] = useState<NewsItem | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const userId = user? user.id : "2539805396614680484";

  useEffect(() => {
    if (!newsItemId || !userId) {
      setLoading(false);
      return;
    }

    const fetchNewsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsResponse = await axios.get(`${API_URL}/posts/${newsItemId}`, {
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        setNewsItem(newsResponse.data);
        setLikeCount(newsResponse.data.like);

        // Use the provided API endpoint to check if the post is liked
        const likeResponse = await axios.get(
          `${API_URL}/posts/${newsItemId}/isLiked`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              userId: userId, // Pass userId in the headers
            },
          }
        );
        setIsLiked(likeResponse.data.isLiked);

        // Fetch comments for the post
        const commentsResponse = await axios.get(
          `${API_URL}/posts/${newsItemId}/getcomments`,
          {
            headers: { "ngrok-skip-browser-warning": "69420" },
          }
        );
        setComments(commentsResponse.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch news detail");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [newsItemId, userId]);

  const handleLikeClick = async () => {
    if (!newsItemId || !userId) return;
    try {
      const response = await axios.post(
        `${API_URL}/posts/${newsItemId}/like`,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            userId: userId,
          },
        }
      );

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error: any) {
      setError(error.message || "Failed to like/unlike post");
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!newsItemId || !userId || !content) return;
    try {
      const response = await axios.post(
        `${API_URL}/posts/${newsItemId}/comment`,
        { content: content },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            userId: userId,
          },
        }
      );

      // Add the new comment to the state
      setComments([...comments, response.data]);
    } catch (error: any) {
      setError(error.message || "Failed to add comment");
    }
  };

  return {
    newsItem,
    isLiked,
    likeCount,
    comments,
    loading,
    error,
    handleLikeClick,
    handleCommentSubmit,
  };
};

export default useNewsDetail;