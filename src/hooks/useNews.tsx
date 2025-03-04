import { useState, useEffect } from 'react';
import axios from 'axios'; // Or your preferred HTTP client
import { NewsItem } from "../types/news";
const API_URL = import.meta.env.VITE_API_URL;

interface UseNewsProps {
  limit: number;
}

const useNews = ({ limit }: UseNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          params: {
            page,
            limit,
          },
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        const newNews = response.data;
        if (newNews.length === 0) {
          setHasMore(false);
        } else {
          setNews((prevNews) => [...prevNews, ...newNews]);
          console.log("News:", news); // Log the updated news state
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch news');
        console.error("Error:", err); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, limit]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { news, loading, error, loadMore, hasMore };
};

export default useNews;