import { Button } from "@mantine/core";
import styled from "styled-components";
import { forwardRef, useState } from "react";
import { MultiSelect, Avatar, Group, Text } from "@mantine/core";
import InterestsCard from "./InterestsCard";

const SEditPageTwo = styled.div``;

interface EditPageTwoProps {
  handleChangeTheCurrentPage(): void;
  handleSubmitNewUserDetails(interestsString: string): void;
}

function EditPageTwo(props: EditPageTwoProps) {
  const [interestsArray, setInterestsArray] = useState<string[]>([]);

  const handleAddInterestToArray = (interest: string) => {
    setInterestsArray([...interestsArray, interest]);
  };

  const handleRemoveInterestFromArray = (interest: string) => {
    var w = interestsArray.filter((each) => each !== interest);
    setInterestsArray([...w]);
  };

  const handleSubmitInterestsArray = () => {
    let interestsString = interestsArray.join(",");
    props.handleSubmitNewUserDetails(interestsString);
  };

  return (
    <SEditPageTwo>
      <h3>Choose Your Interests</h3>
      <p>(Optional)</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          border: "1px solid black",
          justifyContent: "center",
          height: "100%",
          overflow: "scroll",
        }}
      >
        {[...Array(20)].map((each, index) => {
          return (
            <InterestsCard
              key={each}
              name={`Interest-${index}`}
              handleAddInterestToArray={handleAddInterestToArray}
              handleRemoveInterestFromArray={handleRemoveInterestFromArray}
              interestsArray={interestsArray}
            />
          );
        })}
      </div>
      <>
        <Button
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
          }}
          onClick={props.handleChangeTheCurrentPage}
        >
          Prev
        </Button>
        <Button
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
          }}
          onClick={handleSubmitInterestsArray}
        >
          Save
        </Button>
      </>
    </SEditPageTwo>
  );
}

export default EditPageTwo;
