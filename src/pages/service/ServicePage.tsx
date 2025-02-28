import React, { FC } from "react";
import { Box, Page, Header, Text, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { FaCloudSun, FaTint, FaChartLine } from "react-icons/fa";

const ServicePage: FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Thời tiết",
      icon: <FaCloudSun className="text-lime-500 text-2xl" />,
      route: "/service/weather",
    },
    {
      name: "Tưới tiêu",
      icon: <FaTint className="text-blue-500 text-2xl" />,
      route: "/service/irrigation",
    },
    {
      name: "Thị trường",
      icon: <FaChartLine className="text-orange-500 text-2xl" />,
      route: "/service/market",
    },
  ];

  return (
    <Page>
      <Header className="bg-green text-white" title="Dịch vụ" />
      <Box className="py-4">
        {services.map((service) => (
          <Box
            key={service.name}
            className="flex items-center justify-between p-3 shadow-md mb-1 bg-white px-5"
            onClick={() => navigate(service.route)}
            style={{ cursor: "pointer" }}
          >
            <Box className="flex items-center">
              {service.icon}
              <Text className="ml-3 text-base font-medium">{service.name}</Text>
            </Box>
            <Icon icon="zi-chevron-right"/>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default ServicePage;