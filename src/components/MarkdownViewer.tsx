import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import CodeBlock from "./CodeBlock";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ inline, className, children }) {
          const language = className ? className.replace("language-", "") : "";
          return (
            <CodeBlock
              inline={inline ? inline : false}
              language={language}
              children={String(children)}
            />
          );
        },
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeMathjax]}
    />
  );
};

export default MarkdownViewer;
