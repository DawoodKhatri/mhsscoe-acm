import { defineDocumentType, makeSource } from "@contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const Event = defineDocumentType(() => ({
  name: "Event",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    image: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (event) => `/events/${event._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "events",
  documentTypes: [Event],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
