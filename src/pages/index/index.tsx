import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Welcome } from "./welcome";
import QuickAcess from "./quickacess";
import { Divider } from "components/divider";
import { AllNewsSection } from "./AllNewsSection";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white ">
      <Welcome />
      <Box className="overflow-x-hidden mt-[-1px] scrollable-content">
        <div className="bg-green-700 mx-[-20px] pt-12 rounded-b-full"></div>

        <QuickAcess /> 
        <Divider size={20} /> 
        <Divider />
        <AllNewsSection title="Tin tức mới nhất" />
        <Divider />
        <AllNewsSection title="Tin tức nổi bật" sortBy="view" />

      </Box>
    </Page>
  );
};

export default HomePage;
