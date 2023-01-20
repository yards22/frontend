import { ActionIcon, Button, FileButton, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IconPlus, IconX } from "../../../Atoms/Icons";
import IconWrapper from "../../../Atoms/IconWrapper";
import ProfilePhoto from "../../../Atoms/ProfilePhoto";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import NewPostImageView from "./NewPostImageView";

const MAX_FILES_ALLOWED = 4;

const SNewPost = styled.div`
  border: 1.5px solid #229bff;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  transition: all 0.5s ease-in-out;
  box-shadow: rgba(98, 161, 255, 0.2) 0px 1px 4px;
  background: #fafdff;
  min-height: 0;
  position: relative;
  :focus-within {
    box-shadow: rgba(98, 161, 255, 0.25) 0px 13px 27px -5px,
      rgba(98, 161, 255, 0.3) 0px 8px 16px -8px;
    margin: 10px 0px;
    min-height: 200px;
  }

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

function NewPost() {
  const { postStore, profileStore } = useStores();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filePaths, setFilePaths] = useState<(string | ArrayBuffer)[]>([]);
  const [content, setContent] = useState("");
  const location = useLocation();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (location.search.includes("inputFocus=true") && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.search]);

  const handleImageSelect = (incomingFiles: File[]) => {
    let finalFiles = [...files, ...incomingFiles];
    finalFiles = finalFiles.slice(0, MAX_FILES_ALLOWED);
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
    <Observer>
      {() => {
        const { profile } = profileStore;
        return (
          <SNewPost>
            <ProfilePhoto
              profileimageuri={profile?.profile_image_uri}
              username={profile?.username}
            />
            <div
              style={{
                width: "100%",
                marginLeft: "18px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Textarea
                ref={inputRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="unstyled"
                autosize
                minRows={2}
                placeholder="Have Thoughts? Bowl It Out 🏏"
                style={{
                  width: "100%",
                  fontSize: "28px",
                  marginBottom: "10px"
                }}
                size="lg"
              />
              {files.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "50px"
                  }}
                >
                  {files.map((item, index) => {
                    const file = item;
                    if (window.FileReader) {
                      const fr = new FileReader();
                      fr.onloadend = function (e) {
                        setFilePaths((p) => {
                          const temp = [...p];
                          if (e.target?.result)
                            temp.push(e.target?.result || "");
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
                          </ActionIcon>
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
                  right: "10px"
                }}
              >
                {files.length <= MAX_FILES_ALLOWED && (
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
                <Button
                  disabled={content === "" && files.length === 0}
                  loading={loading}
                  style={{ marginLeft: "20px" }}
                  radius="xl"
                  onClick={() => {
                    setLoading(true);
                    const postDetails = {
                      content,
                      images: files
                    };

                    postStore
                      .CreatePost(postDetails)
                      .then((res) => {
                        showNotification({
                          title: "Post created.",
                          message: "",
                          autoClose: 2500,
                          color: "green"
                        });

                        // cleaning
                        setFiles([]);
                        setFilePaths([]);
                        setContent("");
                        setLoading(false);
                      })
                      .catch((err) => {
                        setLoading(false);
                        showNotification({
                          title: "Could not create post.",
                          message: "",
                          autoClose: 2500,
                          color: "red"
                        });
                      });
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </SNewPost>
        );
      }}
    </Observer>
  );
}

export default NewPost;
