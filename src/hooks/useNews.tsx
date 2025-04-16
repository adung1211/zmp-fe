import { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsItem } from "../types/news";

const API_URL = import.meta.env.VITE_API_URL;

const newsCache: Record<string, NewsItem[]> = {};

interface UseNewsProps {
  limit: number;
  category?: string;
  sortBy?: string;
  searchTerm?: string;
}

const useNews = ({ limit, category, sortBy, searchTerm }: UseNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const cacheKey = `${category || 'all'}-${sortBy || 'default'}`;

      if (page === 1 && newsCache[cacheKey]) {
        setNews(newsCache[cacheKey]);
        setHasMore(newsCache[cacheKey].length >= limit);
      }
      try {
        console.log( "page:", page, "limit:", limit, "category:", category, "sortBy:", sortBy);
        const response = await axios.get(`${API_URL}/posts`, {
          params: {
            page,
            limit,
            category,
            sortBy,
            query: searchTerm,
          },
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        const newNews = response.data;
        if (newNews.length === 0) {
          setHasMore(false);
        } else {
          if (page === 1) {
            newsCache[cacheKey] = newNews;
            setNews(newNews);
          } else {
            setNews((prevNews) => [...prevNews, ...newNews]);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch news');
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, limit, category, sortBy, searchTerm]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { news, loading, error, loadMore, hasMore };
};

export default useNews;