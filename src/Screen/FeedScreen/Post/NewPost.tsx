import {
  ActionIcon,
  Button,
  FileButton,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import styled from "styled-components";
import { IconPlus, IconX } from "../../../Atoms/Icons";
import IconWrapper from "../../../Atoms/IconWrapper";
import ProfileAvatar from "../../../Atoms/ProfileAvatar";
import NewPostImageView from "./NewPostImageView";

const MAX_FILES_ALLOWED = 4;

const props: { profile_pic_url: string } = {
  profile_pic_url:
    "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
};
const SNewPost = styled.div`
  border-bottom: 1px
    ${(p) => (p.theme.isFocus ? "dashed " : "solid ") + p.theme.borderColor};
  padding: 12px;
  display: flex;
  transition: all 0.5s;
  min-height: ${(p) => (p.theme.isFocus ? "160px" : "0px")};
  position: relative;
`;

function NewPost() {
  const mantineTheme = useMantineTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [filePaths, setFilePaths] = useState<(string | ArrayBuffer)[]>([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleImageSelect = (incomingFiles: File[]) => {
    let finalFiles = [...files, ...incomingFiles];
    finalFiles = finalFiles.slice(0, 4);
    let finalFilePaths: (string | ArrayBuffer)[] = [];

    finalFiles.forEach((item, index) => {
      if (window.FileReader) {
        const fr = new FileReader();
        fr.onloadend = function (e) {
          if (e.target?.result) finalFilePaths.push(e.target.result || "");
        };
        fr.readAsDataURL(item);
      }
    });

    setFiles(finalFiles);
    setFilePaths(finalFilePaths);
  };

  return (
    <SNewPost
      theme={{
        isFocus,
        borderColor: isFocus
          ? mantineTheme.colors[mantineTheme.primaryColor][3]
          : mantineTheme.colors["gray"][3],
      }}
    >
      <ProfileAvatar imageUrl={props.profile_pic_url} />
      <div
        style={{
          width: "100%",
          marginLeft: "18px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Textarea
          variant="unstyled"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autosize
          minRows={2}
          placeholder="Have Thoughts? Bowl It Out 🏏"
          style={{ width: "100%", fontSize: "28px", marginBottom: "10px" }}
          size="lg"
        />
        {files.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "50px",
            }}
          >
            {files.map((item, index) => {
              const file = item;
              if (window.FileReader) {
                const fr = new FileReader();
                fr.onloadend = function (e) {
                  setFilePaths((p) => {
                    const temp = [...p];
                    if (e.target?.result) temp.push(e.target?.result || "");
                    return temp;
                  });
                };
                fr.readAsDataURL(file);
              }
              return (
                <NewPostImageView
                  key={"new_post_image" + index}
                  src={filePaths[index]}
                  actions={[
                    <ActionIcon
                      key={`new_post_image_${index}_del`}
                      variant="light"
                      radius={"xl"}
                      onClick={() => {
                        const tempFiles = [...files];
                        const tempFilePaths = [...filePaths];
                        tempFiles.splice(index, 1);
                        tempFilePaths.splice(index, 1);
                        setFiles(tempFiles);
                        setFilePaths(tempFilePaths);
                      }}
                    >
                      {<IconWrapper color="gray">{IconX}</IconWrapper>}
                    </ActionIcon>,
                  ]}
                />
              );
            })}
          </div>
        )}
        <div
          style={{
            paddingTop: "5px",
            position: "absolute",
            bottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            right: "10px",
          }}
        >
          {files.length < 4 && (
            <FileButton
              onChange={handleImageSelect}
              accept="image/png,image/jpeg"
              multiple
            >
              {(props) => (
                <Button
                  variant="subtle"
                  compact
                  {...props}
                  leftIcon={<IconWrapper>{IconPlus}</IconWrapper>}
                >
                  Add Images
                </Button>
              )}
            </FileButton>
          )}
          <Button style={{ marginLeft: "20px" }} radius="xl">
            Post
          </Button>
        </div>
      </div>
    </SNewPost>
  );
}

export default NewPost;
