import React, { FC, useEffect, useState } from "react";
import { Box, Tabs, Text } from "zmp-ui";
import { useNewsTab } from "hooks/useNewsTab";
import useCategories from "hooks/useCategories";
import { Category } from "types/category";

const NewsTabs: FC = () => {
  const [tab, setTab] = useNewsTab();
  const { categories, loading, error } = useCategories();
  const [categoryTabs, setCategoryTabs] = useState<Category[]>([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryTabs(categories);
    }
  }, [categories]);

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <Box className="bg-white shadow-md">
      <Tabs activeKey={tab} onChange={handleTabChange} className="px-4" scrollable>
        <Tabs.Tab
          key="latest"
          label={<Text className=" font-semibold">Mới nhất</Text>}
        />
        <Tabs.Tab
          key="featured"
          label={<Text className=" font-semibold">Nổi bật</Text>}
        />
        {categoryTabs.map((category) => (
          <Tabs.Tab
            key={category._id}
            label={<Text className=" font-semibold">{category.name}</Text>}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default NewsTabs;