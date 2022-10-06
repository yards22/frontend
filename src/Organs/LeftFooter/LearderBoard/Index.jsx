import { Card, Table } from "@mantine/core";
import styled from "styled-components";
import { leaderBoardDummyData } from "../../../Data/Dummies/LeaderBoard";

const SLeaderBoardIndex = styled.div`
   width : 100%;
   margin-bottom: 15px;
   height: 100%;
   overflow-y: auto;
   ::-webkit-scrollbar {
    display: none;
   }
`

function LeaderBoardIndex() {

  const columnNames = (
    <tr>
      <th>position</th>
      <th>User</th>
    </tr>
  );

  const rows = leaderBoardDummyData.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.username}</td>
    </tr>
  ));


  return (
    <SLeaderBoardIndex>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <caption>LeaderBoard</caption>
                <thead>{columnNames}</thead>
                <tbody>{rows}</tbody>
           </Table>
        </Card>
    </SLeaderBoardIndex>
  );
}

export default LeaderBoardIndex;
