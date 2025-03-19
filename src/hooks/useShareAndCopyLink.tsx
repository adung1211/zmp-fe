import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAppInfo, openShareSheet } from "zmp-sdk/apis";
import { NewsItem } from "../types/news";

interface UseShareAndCopyLinkProps {
  newsItem: NewsItem | null;
}

const useShareAndCopyLink = ({ newsItem }: UseShareAndCopyLinkProps) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const [appVersion, setAppVersion] = useState<string | null>(null);

  useEffect(() => {
    getAppInfo({
      success: (data) => {
        setAppUrl(data.appUrl);
        setAppVersion(data.version);
        alert("App data: " + JSON.stringify(data));
      },
      fail: (error) => {
        console.error("Failed to get app info:", error);
      },
    });
  }, []);

  const shareCurrentPage = async () => {
    if (!newsItem) return;
    try {
      const data = await openShareSheet({
        type: "zmp_deep_link",
        data: {
          title: newsItem.title,
          thumbnail: newsItem.thumbnail_url,
        },
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const copyLink = () => {
    if (!appUrl) {
      alert("Không thể lấy đường dẫn ứng dụng.");
      return;
    }
    const url = `${appUrl}news/${id}`;
    //const url = `${appUrl}news/${id}?env=DEVELOPMENT&version=${appVersion}`; // dev url
    const tempInput = document.createElement("textarea");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Đã sao chép đường dẫn!");
  };

  return { shareCurrentPage, copyLink };
};

export default useShareAndCopyLink;