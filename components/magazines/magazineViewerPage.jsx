import { Skeleton } from "antd";
import React from "react";

const MagazineViewerPage = ({ pageUrl }) => {
  return (
    <>
      {pageUrl ? (
        <img className="w-full h-full" src={pageUrl} />
      ) : (
        <Skeleton.Node active className="!w-full !h-full [&>div]:!w-full">
          <>Loading...</>
        </Skeleton.Node>
      )}
    </>
  );
};

export default MagazineViewerPage;
