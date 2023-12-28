"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import ReactFlipBook from "react-pageflip";
import MagazineService from "@/services/magazine";
import { useRouter } from "next/navigation";

const MagazineViewer = ({ magazine }) => {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [currPage, setCurrPage] = useState(1);
  const [isFullscreen, setFullscreen] = useState(false);
  const bookViewerRef = useRef();
  const bookRef = useRef();

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth - 40,
      height: window.innerHeight - 104,
    });

    window.addEventListener("resize", () => {
      if (document.fullscreenElement) {
        setScreenSize({
          width: window.innerWidth - 40,
          height: window.innerHeight - 40,
        });
      } else {
        setScreenSize({
          width: window.innerWidth - 40,
          height: window.innerHeight - 104,
        });
      }
    });
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      bookViewerRef.current?.requestFullscreen();
    }
    setFullscreen(!document.fullscreenElement);
  };

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
    setCurrPage(
      currPage + (screenSize.width < 640 ? 1 : currPage === 1 ? 1 : 2)
    );
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
    setCurrPage(
      currPage - (screenSize.width < 640 ? 1 : currPage - 2 === 0 ? 1 : 2)
    );
  };

  return (
    <>
      <div
        className={`w-full relative overflow-hidden${
          isFullscreen ? " bg-white" : ""
        }`}
        style={{ height: screenSize.height }}
        ref={bookViewerRef}
      >
        <div
          className={`w-full h-full absolute`}
          style={{ top: isFullscreen ? 20 : 0 }}
        >
          <ReactFlipBook
            key={screenSize.width + screenSize.height}
            startPage={currPage - 1}
            className="!mx-auto"
            style={{
              minHeight: 0,
              height: screenSize.height,
            }}
            width={
              screenSize.width > 720
                ? screenSize.width / 3
                : screenSize.width > 640
                ? screenSize.width / 2
                : screenSize.width
            }
            height={screenSize.height}
            usePortrait={screenSize.width < 640}
            ref={bookRef}
            showCover={true}
            useMouseEvents={false}
          >
            {magazine.pages.map((pagePath, pageIndex) => (
              <div
                key={`magazine_page_index_${pageIndex}`}
                style={{
                  width:
                    screenSize.width > 720
                      ? screenSize.width / 3
                      : screenSize.width > 640
                      ? screenSize.width / 2
                      : screenSize.width,
                  height: screenSize.height,
                }}
              >
                <img className="w-full h-full" src={`/api/file/${pagePath}`} />
              </div>
            ))}
          </ReactFlipBook>
        </div>
        {magazine.pages.length > 0 && (
          <div
            className="relative h-full flex flex-col justify-center items-center"
            style={{ padding: isFullscreen ? "20px" : "12px" }}
          >
            <div className="w-full flex-grow flex justify-between items-center">
              <Button
                onClick={prevPage}
                icon={<DoubleLeftOutlined />}
                disabled={currPage === 1}
                type="primary"
                size="large"
              />
              <Button
                onClick={nextPage}
                icon={<DoubleRightOutlined />}
                disabled={
                  currPage ===
                  magazine.pages.length -
                    (magazine.pages.length % 2 !== 0 || screenSize.width < 640
                      ? 0
                      : 1)
                }
                type="primary"
                size="large"
              />
            </div>
            <div className="bg-white shadow-lg shadow-gray-500 rounded-lg p-3 flex justify-center items-center gap-3">
              <Button
                onClick={() => router.back()}
                icon={<ArrowLeftOutlined />}
                type="primary"
              >
                Back
              </Button>
              <p>
                {screenSize.width < 640 ||
                currPage === 1 ||
                currPage === magazine.pages.length
                  ? currPage
                  : `${currPage}-${currPage + 1}`}
                /{magazine.pages.length}
              </p>
              <Button
                onClick={toggleFullscreen}
                icon={
                  isFullscreen ? (
                    <FullscreenExitOutlined />
                  ) : (
                    <FullscreenOutlined />
                  )
                }
                type="primary"
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MagazineViewer;
