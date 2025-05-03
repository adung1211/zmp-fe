import React, { FC, useState } from "react";
import { Box, Input, Text } from "zmp-ui";
import { FaSearch, FaClock, FaEye, FaSortAmountDown } from "react-icons/fa";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  onSortChange: (sortBy: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("latest");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsDropdownOpen(false);
    onSortChange(value);
  };

  return (
    <Box className="bg-green-700 px-4 pb-2 pt-1 mt-[-1px]">
      <Box className="flex justify-between">
        <Box className="flex items-center bg-white rounded-full px-3 text-sm w-full">  
          <FaSearch className="text-gray-500 mr-2" />
          <Input
            type="text"
            placeholder="Tìm kiếm tin tức..."
            className="flex-1 border-none shadow-none max-h-7"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <Box
          className="relative cursor-pointer px-3 py-1 rounded-md ml-1 mr-[-1rem]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Box className="flex items-center">
            <FaSortAmountDown className="text-white text-xl mr-2" />
          </Box>
          {isDropdownOpen && (
            <Box className="absolute top-full right-1/4 mt-1 bg-white shadow-md rounded-md w-auto z-10">
              <Box
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center rounded-t-md"
                onClick={() => handleSortChange("latest")}
              >
                <FaClock className="mr-2" />
                <Text className="whitespace-nowrap">Mới nhất</Text>
              </Box>
              <Box
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center rounded-b-md"
                onClick={() => handleSortChange("view")}
              >
                <FaEye className="mr-2 text-lg" />
                <Text className="whitespace-nowrap">Lượt xem</Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchInput;