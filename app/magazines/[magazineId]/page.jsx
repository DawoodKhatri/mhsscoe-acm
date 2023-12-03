"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import "../../../styles/magazineViewer.css";
import ReactFlipBook from "react-pageflip";
import MagazineService from "@/services/magazine";
import { getPdfDocument, getPdfPage } from "@/utils/pdfHandler";
import MagazineViewerPage from "@/components/magazines/magazineViewerPage";
import { dispatch } from "@/redux/store";
import { loading } from "@/redux/reducers/commonReducer";

const MagazineViewPage = ({ params: { magazineId } }) => {
  const [magazine, setMagazine] = useState();
  const [pages, setPages] = useState([]);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [currPage, setCurrPage] = useState(1);
  const [isFullscreen, setFullscreen] = useState(false);
  const bookViewerRef = useRef();
  const bookRef = useRef();

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight - 104,
    });

    window.addEventListener("resize", () => {
      if (document.fullscreenElement) {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight - 40,
        });
      } else {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight - 104,
        });
      }
    });

    MagazineService.getMagazineDetails(magazineId).then(
      async ({ magazine: { file } = {} }) => {
        dispatch(loading(true));
        setMagazine(
          await getPdfDocument(
            new URL(`/api/file/${file}`, window.location.href).toString()
          )
        );
        dispatch(loading(false));
      }
    );
  }, []);

  useEffect(() => {
    if (magazine) {
      setPages(Array(magazine.numPages).fill(null));
      renderPages();
    }
  }, [magazine]);

  const renderPages = async () => {
    const renderedPages = await Promise.all(
      Array(magazine.numPages)
        .fill(null)
        .map(async (pageUrl, pageIndex) => {
          const pageCanvas = await getPdfPage(magazine, pageIndex + 1);
          const pageBlob = await new Promise((resolve, reject) => {
            pageCanvas.toBlob((pageBlob) => {
              resolve(pageBlob);
            });
          });
          return URL.createObjectURL(pageBlob);
        })
    );

    setPages(renderedPages);
  };

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
    setCurrPage(currPage + (currPage === 1 ? 1 : 2));
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
    setCurrPage(currPage - (currPage - 2 === 0 ? 1 : 2));
  };

  const getBookWidth = () => {
    if (screenSize.width > 720) {
      return screenSize.height / 1.414;
    } else if (screenSize.width > 480) {
      return screenSize.width / 1.5;
    } else {
      return screenSize.width - 40;
    }
  };

  return (
    <>
      <div
        className={`w-full relative${isFullscreen ? " bg-white" : ""}`}
        style={{ height: screenSize.height }}
        ref={bookViewerRef}
      >
        <div
          className={`w-full h-full absolute`}
          style={{ top: isFullscreen ? 20 : 0 }}
        >
          {pages.length > 0 && (
            <ReactFlipBook
              key={screenSize.height}
              className="!mx-auto"
              width={getBookWidth()}
              height={getBookWidth() * 1.414}
              ref={bookRef}
              showCover={true}
              useMouseEvents={false}
              autoSize={true}
              onInit={() => {
                bookRef.current?.pageFlip()?.turnToPage(currPage - 1);
              }}
            >
              {pages.map((pageUrl, pageIndex) => (
                <div
                  key={`magazine_page_index_${pageIndex}`}
                  style={{
                    width: getBookWidth(),
                    height: getBookWidth() * 1.414,
                  }}
                >
                  <MagazineViewerPage pageUrl={pageUrl} />
                </div>
              ))}
            </ReactFlipBook>
          )}
        </div>
        {pages.length > 0 && (
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
                disabled={currPage >= magazine.numPages - 1}
                type="primary"
                size="large"
              />
            </div>
            <div className="bg-white shadow-lg shadow-gray-500 rounded-lg p-3 flex justify-center items-center gap-3">
              <p>
                {currPage > 1 && currPage < magazine.numPages
                  ? `${currPage}-${currPage + 1}`
                  : currPage}
                /{magazine.numPages}
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

export default MagazineViewPage;
