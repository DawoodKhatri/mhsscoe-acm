import { getPdfPage } from "@/utils/pdfHandler";
import { Skeleton } from "antd";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const MagazineViewerPage = ({ magazine, pageNo }) => {
  const pageRef = useRef();

  useEffect(() => {
    if (pageRef.current) {
      getPdfPage(magazine, pageNo).then((canvas) => {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        pageRef.current.innerHTML = "";
        pageRef.current.appendChild(canvas);
      });
    }
  }, [pageRef.current]);

  return (
    <div className="w-full h-full" ref={pageRef}>
      <Skeleton.Node active className="!w-full !h-full [&>div]:!w-full">
        <>Loading...</>
      </Skeleton.Node>
    </div>
  );
};

export default MagazineViewerPage;
