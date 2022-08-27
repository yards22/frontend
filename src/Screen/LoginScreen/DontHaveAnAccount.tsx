import { Card, Title, Button } from "@mantine/core";
import React from "react";

function DontHaveAnAccount() {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        borderRadius: "5px",
        width: "100%",
        padding: "10px",
        height: "60px",
        margin: "30px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Title order={5}>{"Don't have an account?"}</Title>
      <Button compact style={{ marginLeft: "10px" }} variant="subtle">
        Sign Up
      </Button>
    </Card>
  );
}

export default DontHaveAnAccount;
