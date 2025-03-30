import React, { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { saveImageToGallery, openShareSheet } from "zmp-sdk/apis";
import logo from "static/logo.png";
import qr from "static/qr.jpg";

const QRCode: FC = () => {
  const handleSaveImage = async () => {
    try {
      await saveImageToGallery({
        imageUrl: "https://i.imgur.com/2zEzJ40.png",
        onProgress: (progress) => {
          console.log(progress);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      const data = await openShareSheet({
        type: "image",
        data: {
          imageUrls: ["https://i.imgur.com/2zEzJ40.png"],
        },
      });
    } catch (err) {}
  };
  
  return (
    <Box className="m-4 flex-1 flex flex-col">
      <Box className="bg-white text-center rounded-xl p-4 space-y-2 flex-1 flex flex-col">
        <Text className="text-xs font-light">Chia sẻ mã QR này để giới thiệu ứng dụng tới bạn bè</Text>
        <img src={logo} className="h-12 mx-auto mag" />
        <Text.Title className="font-bold text-base">An Tâm Tưới Mini App</Text.Title>
        <img src={qr} className="h-24 mx-auto mag flex-1" />

        <Box className="flex justify-center space-x-20 pt-4">
          <Button className="text-xs" variant="secondary" size="medium" onClick={handleSaveImage}>Lưu ảnh<Icon icon="zi-download" className="ml-2"/></Button>
          <Button className="text-xs" variant="secondary" size="medium" onClick={handleShare}>Chia sẻ<Icon icon="zi-share-external-2" className="ml-2"/></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QRCode;