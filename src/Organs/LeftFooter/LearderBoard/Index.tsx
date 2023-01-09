import { Card, Table, Text, Divider, Button } from "@mantine/core";
import styled from "styled-components";
import LinkedUserName from "../../../Atoms/LinkedUserName";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SLeaderBoardIndex = styled.div`
  width: 100%;
  margin-bottom: 15px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function LeaderBoardIndex() {
  const stores = useStores();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    stores.miscStore.GetLeaderboard();
  }, []);
  return (
    <Observer>
      {() => {
        const { miscStore } = stores;
        if (!miscStore.leaderboard) return <p>Loading</p>;
        return (
          <SLeaderBoardIndex>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <b>Leaderboard</b>
              <Button
                variant="subtle"
                onClick={() => {
                  navigate("/leaderboard");
                }}
              >
                View All
              </Button>
            </div>
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
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>CricIndex</th>
                  </tr>
                </thead>
                <tbody>
                  {miscStore.leaderboard.map((element, index) => {
                    let max = 5;
                    if (pathname === "/leaderboard") max = 50;
                    if (index < max)
                      return (
                        <tr key={"leader-board" + element.username}>
                          <td style={{ height: "22px", width: "100%" }}>
                            <LinkedUserName username={element.username} />
                          </td>
                          <td style={{ height: "22px", textAlign: "center" }}>
                            {element.cric_index}
                          </td>
                        </tr>
                      );
                    return null;
                  })}
                </tbody>
              </Table>
            </Card>
          </SLeaderBoardIndex>
        );
      }}
    </Observer>
  );
}

export default LeaderBoardIndex;
