import React from "react";
import Glassmorphism from "../common/glassmorphism";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EventBlog = ({ blog }) => {
  return (
    <Glassmorphism className="p-5">
      <Markdown className="prose" remarkPlugins={remarkGfm}>{blog}</Markdown>
    </Glassmorphism>
  );
};

export default EventBlog;
