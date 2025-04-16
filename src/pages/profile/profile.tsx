import React, { FC } from "react";
import { Header, Page } from "zmp-ui";
import { useAuth } from "hooks";
import { Welcome } from "../index/welcome";
import Subscription from "./Subscription";
import Personal from "./Personal";
import Other from "./Other";
import QRCode from "./QRCode";

const ProfilePage: FC = () => {
  const { user } = useAuth();
  
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      {!user && <Subscription />}
      {user && <Personal />}
      <QRCode />
    </Page>
  );
};

export default ProfilePage;