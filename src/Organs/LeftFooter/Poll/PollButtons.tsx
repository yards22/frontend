import { useMantineTheme } from "@mantine/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
interface PollButtonsProps {
  buttons: { title: string; votes: number }[];
  onPoll: (index: number) => void;
  selected: boolean;
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
  const [selected, setSelected] = useState<number | null>(
    props.selected ? -1 : null
  );
  const [votes, setVotes] = useState<number[]>(
    props.buttons.map((item) => item.votes)
  );
  const { colors } = useMantineTheme();
  const totalVotes = useMemo(() => {
    let temp = 0;
    votes.forEach((item) => {
      temp += item;
    });
    return temp;
  }, [votes]);
  return (
    <>
      {props.buttons.map((item, index) => {
        return (
          <MainBox
            key={"poll_button" + props.buttons[index].title}
            style={{
              border: "1px dashed " + colors.blue[5],
              color: colors.blue[8],
              cursor: selected == null ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (selected == null) {
                setVotes((p) =>
                  p.map((pItem, pIndex) => {
                    if (pIndex === index) return pItem + 1;
                    else return pItem;
                  })
                );
                setSelected(index);
                props.onPoll(index);
              }
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
                  selected != null ? (votes[index] / totalVotes) * 100 : 0,
              }}
            />
            <p style={{ zIndex: "3", position: "absolute", left: "10px" }}>
              {item.title}
              {"  "}
              {selected !== null && selected != null
                ? `(${Math.round((votes[index] / totalVotes) * 100) + "%"})`
                : ""}
            </p>
          </MainBox>
        );
      })}
    </>
  );
}

export default PollButtons;
