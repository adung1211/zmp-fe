import { useState, useEffect } from "react";
import { Category } from "../types/category";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/categories`, {
          headers: { "ngrok-skip-browser-warning": "69420" },
        });
        setCategories(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;