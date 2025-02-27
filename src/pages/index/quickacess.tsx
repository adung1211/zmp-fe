import React from 'react';
import { Box } from 'zmp-ui';
import { FaInfo, FaGift, FaUser, FaPhone } from 'react-icons/fa';

function QuickAccess() {
  const iconStyle = "text-lime-600 text-2xl";
  const textStyle = "text-sm text-gray-700";
  const containerStyle = "flex flex-col items-center space-y-2 font-semibold";
  const bgStyle = "bg-lime-100 p-3 rounded-full";


  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4 rounded-xl shadow-lg mt-[-40px] mx-4">
      <div className={containerStyle}>
        <div className={bgStyle}>
          <FaInfo className={iconStyle} />
        </div>
        <span className={textStyle}>Thông tin</span>
      </div>
      <div className={containerStyle}>
      <div className={bgStyle}>
          <FaGift className={iconStyle} />
        </div>
        <span className={textStyle}>Ưu đãi</span>
      </div>
      <div className={containerStyle}>
      <div className={bgStyle}>
        <FaUser className={iconStyle} />
        </div>
        <span className={textStyle}>Hồ sơ</span>
      </div>
      <div className={containerStyle}>
      <div className={bgStyle}>
        <FaPhone className={iconStyle} />
        </div>
        <span className={textStyle}>Liên hệ</span>
      </div>
    </Box>
  );
}

export default QuickAccess;