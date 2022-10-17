import { Card, Button, Textarea, useMantineTheme, Title } from "@mantine/core";
import styled from "styled-components";

const SFeedback = styled.div`
  width: 100%;
  margin-top: 30px;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function FeedbackIndex() {
  const mantineTheme = useMantineTheme();

  return (
    <SFeedback>
      <Card
        shadow="lg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          border: "1.5px dashed " + mantineTheme.colors.blue[3],
        }}
      >
        <Title order={3} size={"md"}>
          Help Us Become Better
        </Title>
        <Textarea
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            width: "100%",
            fontSize: "25px",
          }}
          minRows={6}
          placeholder="Every suggestion helps us deliver better."
        />
        <Button variant="light" style={{ width: "100%" }}>
          Send Feedback
        </Button>
      </Card>
    </SFeedback>
  );
}

export default FeedbackIndex;
