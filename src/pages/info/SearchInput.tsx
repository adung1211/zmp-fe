import React, { FC, useState } from "react";
import { Box, Input } from "zmp-ui";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Call the callback function with the new search term
    };

    return (
        <Box className="bg-green px-4 pb-2 pt-1 mt-[-1px]">
        <Box className="flex items-center bg-white rounded-full px-3 text-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <Input
            type="text"
            placeholder="Tìm kiếm tin tức..."
            className="flex-1 border-none shadow-none max-h-7"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>
    );
}

export default SearchInput;