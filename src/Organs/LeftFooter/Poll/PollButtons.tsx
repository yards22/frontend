import { Button, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
interface PollButtonsProps {
  buttons: { title: string; votes: number }[];
}

const MainBox = styled.button`
  padding: 0;
  margin: 4px 0;
  border: 0;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background: none;
  font-weight: bold;
  font-size: 15px;
  position: relative;
`;

const PercentageBackground = styled.div`
  background: #aff6ff;
  width: ${(p) => p.theme.percentage + "%"};
  transition: all 0.5s;
  height: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  color: white;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
`;

function PollButtons(props: PollButtonsProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const { colors } = useMantineTheme();
  const totalVotes = useMemo(() => {
    let temp = 0;
    props.buttons.forEach((item) => {
      temp += item.votes;
    });
    return temp;
  }, [props.buttons]);
  return (
    <>
      {props.buttons.map((item, index) => {
        return (
          <MainBox
            style={{
              border: "1px dashed " + colors.blue[5],
              color: colors.blue[8],
              cursor: selected == null ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (selected == null) setSelected(index);
            }}
          >
            <PercentageBackground
              style={{
                background: colors.blue[1],
                color: colors.blue[9],
                paddingRight: selected !== null ? "10px" : "0",
              }}
              theme={{
                percentage:
                  selected != null ? (item.votes / totalVotes) * 100 : 0,
              }}
            />
            <p style={{ zIndex: "3", position: "absolute", left: "10px" }}>
              {item.title}
              {"  "}
              {selected !== null && selected != null
                ? `(${Math.round((item.votes / totalVotes) * 100)+"%"})`
                : ""}
            </p>
          </MainBox>
        );
      })}
    </>
  );
}

export default PollButtons;
