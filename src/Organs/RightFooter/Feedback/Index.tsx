import {
  Card,
  Button,
  Textarea,
  useMantineTheme,
  Title,
  FileInput,
  Text
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Image } from "react-feather";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";

const SFeedback = styled.div`
  width: 100%;
`;

function FeedbackIndex() {
  const mantineTheme = useMantineTheme();
  const [feedback, setFeedback] = useState<{ content: string; image?: File }>({
    content: "",
    image: undefined
  });
  const [loading, setLoading] = useState(false);
  const store = useStores();

  return (
    <SFeedback>
      <Card
        shadow="lg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          border: "1.5px dashed " + mantineTheme.colors.blue[3]
        }}
      >
        <Title order={3} size={"md"}>
          Help Us Become Better
        </Title>
        <Text color={"dimmed"} size="sm" className="my-2 text-center">
          What did you like most about our service? What areas do you think we
          can improve on for your next visit?
        </Text>
        <Textarea
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            width: "100%",
            fontSize: "25px"
          }}
          minRows={6}
          value={feedback.content}
          onChange={(e) => {
            setFeedback((p) => {
              return { ...p, content: e.target.value };
            });
          }}
          placeholder="Every suggestion helps us deliver better."
        />
        <FileInput
          style={{ margin: "10px 0", width: "100%" }}
          value={feedback.image}
          accept="image/png,image/jpeg"
          placeholder="Attach some screenshot, if necessary."
          onChange={(file) => {
            if (file)
              setFeedback((p) => {
                return { ...p, image: file };
              });
          }}
          icon={<Image size={14} />}
        />
        <Button
          loading={loading}
          disabled={feedback.content === "" && feedback.image === undefined}
          variant="light"
          style={{ width: "100%" }}
          onClick={() => {
            setLoading(true);
            store.miscStore
              .CreateFeedback(feedback.content, feedback.image)
              .then(() => {
                setLoading(false);
                showNotification({
                  title: "Feedback Submitted.",
                  message: "Thank you for your valuable feedback.",
                  color: "green"
                });
                setFeedback({ content: "", image: undefined });
              })
              .catch((err) => {
                setLoading(false);
                showNotification({
                  title: "Feedback Not Submitted.",
                  message: "Something went wrong, please try again.",
                  color: "red"
                });
              });
          }}
        >
          Send Feedback
        </Button>
      </Card>
    </SFeedback>
  );
}

export default FeedbackIndex;
