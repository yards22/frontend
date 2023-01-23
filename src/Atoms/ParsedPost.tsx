import { Anchor } from "@mantine/core";
import { LinkIt, urlRegex } from "react-linkify-it";

function ParsedPost(props: { content: string | null }) {
  if (!props.content) return <></>;
  return (
    <LinkIt
      regex={urlRegex}
      component={(match, key) => (
        <Anchor
          href={match}
          key={key}
          target={"_blank"}
          className="no-underline"
        >
          {match}
        </Anchor>
      )}
    >
      <p className="whitespace-pre-wrap">{props.content}</p>
    </LinkIt>
  );
}

export default ParsedPost;
