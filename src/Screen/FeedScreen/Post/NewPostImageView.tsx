import { Image } from "@mantine/core";
import React from "react";
import styled from "styled-components";
const SNewPostImageView = styled.div`
  border-radius: 10px;
  width: 50%;
  padding: 10px;
  position: relative;
`;

interface NewPostImageViewProps {
  src: string | ArrayBuffer;
  actions?: React.ReactNode[];
}
function NewPostImageView(props: NewPostImageViewProps) {
  return (
    <SNewPostImageView>
      <Image radius="md" src={props.src as any} style={{ width: "100%" }} />
      {props.actions && (
        <div style={{ position: "absolute", top: "14px", right: "14px" }}>
          {props.actions.map((item, index) => {
            return item;
          })}
        </div>
      )}
    </SNewPostImageView>
  );
}

export default NewPostImageView;
