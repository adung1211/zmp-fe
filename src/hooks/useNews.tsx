import { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsItem } from "../types/news";

const API_URL = import.meta.env.VITE_API_URL;

interface UseNewsProps {
  limit: number;
  category?: string;
}

const useNews = ({ limit, category }: UseNewsProps) => {
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
        console.log( "page:", page, "limit:", limit, "category:", category);
        const response = await axios.get(`${API_URL}/posts`, {
          params: {
            page,
            limit,
            category,
          },
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        const newNews = response.data;
        if (newNews.length === 0) {
          setHasMore(false);
        } else if (page === 1) { // Initial load
          setNews(newNews);
          console.log("Fresh News:", news);
        } else {
          setNews((prevNews) => [...prevNews, ...newNews]);
          console.log("News:", news);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch news');
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, limit, category]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { news, loading, error, loadMore, hasMore };
};

export default useNews;