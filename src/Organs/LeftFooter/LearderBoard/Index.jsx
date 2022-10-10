import {
  Card,
  Table,
  Text,
  Divider,
  SegmentedControl,
  Center,
  Box,
} from "@mantine/core";
import styled from "styled-components";
import {
  leaderBoardDummyData,
  leaderBoardDummyDataGlobal,
} from "../../../Data/Dummies/LeaderBoard";
import { useState } from "react";

const SLeaderBoardIndex = styled.div`
  width: 100%;
  margin-bottom: 15px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const columnNamesWeekly = (
  <tr>
    <th>position</th>
    <th style={{ height: "22px", width: "100%", textAlign: "end" }}>User</th>
  </tr>
);

const columnNamesGlobal = (
  <tr>
    <th>User</th>
    <th>CricIndex</th>
  </tr>
);

const rowsWeekly = leaderBoardDummyData.map((element) => (
  <tr key={element.name}>
    <td style={{ height: "22px", textAlign: "center" }}>{element.position}</td>
    <td style={{ height: "22px", width: "100%", textAlign: "end" }}>
      {element.username}
    </td>
  </tr>
));

const rowsGlobal = leaderBoardDummyDataGlobal.map((element) => (
  <tr key={element.username}>
    <td style={{ height: "22px", width: "100%" }}>{element.username}</td>
    <td style={{ height: "22px", textAlign: "center" }}>{element.cricindex}</td>
  </tr>
));

function LeaderBoardIndex() {
  const [currentBoard, setCurrentBoard] = useState("weekly");
  const [currentColumnNames, setCurrentColumnNames] =
    useState(columnNamesWeekly);
  const [currentRows, setCurrentRows] = useState(rowsWeekly);

  return (
    <SLeaderBoardIndex>
      <Text italic size={"md"} style={{ marginLeft: "5px" }}>
        LeaderBoard
      </Text>
      <Divider my="sm" color={"black"} style={{ marginTop: "5px" }} />
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SegmentedControl
          value={currentBoard}
          onChange={(e) => {
            setCurrentBoard(e);
            if (e === "weekly") {
              setCurrentColumnNames(columnNamesWeekly);
              setCurrentRows(rowsWeekly);
            } else {
              setCurrentColumnNames(columnNamesGlobal);
              setCurrentRows(rowsGlobal);
            }
          }}
          data={[
            {
              label: (
                <Center>
                  <Box ml={5} mr={5}>
                    Weekly
                  </Box>
                </Center>
              ),
              value: "weekly",
            },
            {
              label: (
                <Center>
                  <Box ml={5} mr={5}>
                    Global
                  </Box>
                </Center>
              ),
              value: "global",
            },
          ]}
        />
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>{currentColumnNames}</thead>
          <tbody>{currentRows}</tbody>
        </Table>
      </Card>
    </SLeaderBoardIndex>
  );
}

export default LeaderBoardIndex;
