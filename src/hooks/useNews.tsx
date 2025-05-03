import { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsItem } from "../types/news";
import { useAuth } from 'hooks';

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const cacheKey = `${category || 'all'}-${searchTerm || 'all'}-${sortBy || 'default'}`;

      if (page === 1 && newsCache[cacheKey] && category !== "liked" && category !== "recommendations") {
        setNews(newsCache[cacheKey]);
        setHasMore(newsCache[cacheKey].length >= limit);
      }
      else if ( (category === "liked" || category === "recommendations") &&  newsCache[cacheKey]) {
        setNews(newsCache[cacheKey]);
        setHasMore(false);
      }

      try {
        let endpoint = `${API_URL}/posts`;
        if( category ==="liked" || category ==="recommendations"){
          endpoint = `${API_URL}/posts/${category}`;
        }
        console.log( "page:", page, "limit:", limit, "category:", category, "sortBy:", sortBy);
        console.log("cacheKey:", cacheKey);
        const response = await axios.get(endpoint, {
          params: {
            page,
            limit,
            category,
            sortBy,
            query: searchTerm,
          },
          headers: {
            "ngrok-skip-browser-warning": "69420",
            userId: user ? user.id : localStorage.getItem("userId"),
          },
          
        });
        const newNews = response.data;
        if (newNews.length === 0) {
          setHasMore(false);
        } else {
          if (page === 1) {
            newsCache[cacheKey] = newNews;
            setNews(newNews);
          } 
          else if ( category !== "liked" && category !== "recommendations") {
            
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