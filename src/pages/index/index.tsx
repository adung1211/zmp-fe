import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Welcome } from "./welcome";
import QuickAcess from "./quickacess";
import { Divider } from "components/divider";
import { Recommend } from "./recommend";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="overflow-x-hidden mt-[-1px]">
        <div className="bg-green mx-[-20px] pt-12 rounded-b-full"></div>

      <QuickAcess /> 
      <Divider size={20} /> 
      <Recommend/>
      <Divider />
      <Recommend/>
      <Divider />
      <Recommend/>
      </Box>
    </Page>
  );
};

export default HomePage;
