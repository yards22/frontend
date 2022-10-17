import { Avatar, Button, Group, Tabs, Text } from "@mantine/core";
import styled from "styled-components";
import {  useEffect, useState } from "react";
import { MultiSelect } from "@mantine/core";
import InterestsCard from "./InterestsCard";
import { interestsDummyData } from "../../../../../Data/Dummies/Interests";
import { AllInterestsList, InternationalTeamList } from "../../../../../Data/Static/Interests";
import { findTheElement, MInterest } from "../../../../../Atoms/Util";

const SEditPageTwo = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const SHideScroll = styled.div`
   overflow: scroll;
   border : 1px solid black;
   height: 275px;
   ::-webkit-scrollbar {
    display: none;
  }
`;

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

interface EditPageTwoProps {
  handleChangeTheCurrentPage(): void;
  handleSubmitNewUserDetails(interestsString: string): void;
  handleAddInterestToArray(p:string):void;
  interestsArray: string[];
  internationalTeamsList : MInterest[];
  handleIntTeamAdd(interest:string):void;
  handleIntTeamRemove(interest:MInterest) : void;
}

function EditPageTwo(props: EditPageTwoProps) {

  const [interestsArrayBefore, setInterestArrayBefore] = useState<string[]>([])
  const [activeInterestTab, setActiveInterestTab] =
    useState("internationalTeams");
  
  
  // const handleRemoveInterestFromArray = (interest: string) => {
  //   var w = interestsArray.filter((each) => each !== interest);
  //   setInterestsArray([...w]);
  // };

  const handleSubmitInterestsArray = () => {
    let interestsString = props.interestsArray.join(",");
    props.handleSubmitNewUserDetails(interestsString);
  };

  const handleChangeOfMultiselect = (array : string[]) =>{
     if(array.length > props.interestsArray.length){
        props.handleAddInterestToArray(array[array.length-1]);
     }
  }

  useEffect(() => {
    console.log("yjh",props.interestsArray)
    if(props.interestsArray.length > interestsArrayBefore.length){
       let element = props.interestsArray[interestsArrayBefore.length];
       let x = findTheElement({element,array :InternationalTeamList})
       if(x !== undefined){
         props.handleIntTeamRemove(x)
       }
       setInterestArrayBefore([...interestsArrayBefore,element])
    }
  }, [props.interestsArray]);

  return (
    <SEditPageTwo>
      <h3>Choose Your Interests</h3>
      <SHideScroll>
        <MultiSelect
          data={AllInterestsList}
          placeholder="Pick all that you like"
          searchable
          value={props.interestsArray}
          onChange={(e: any) => {
            handleChangeOfMultiselect(e)
          }}
          nothingFound="Nothing found"
          clearable
          transitionDuration={150}
          transition="pop-top-left"
          transitionTimingFunction="ease"
        />
        <Tabs onTabChange={(e: any) => setActiveInterestTab(e)} defaultValue={"internationalTeams"}>
          <Tabs.List
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Tabs.Tab value="internationalTeams" defaultChecked>INTL Teams</Tabs.Tab>
            <Tabs.Tab value="leaguesAndTournaments">Leagues</Tabs.Tab>
            <Tabs.Tab value="domesticLeagues">Domestic</Tabs.Tab>
            <Tabs.Tab value="players">Players</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-around",
            marginTop: "15px",
            maxHeight: "190px",
            flexShrink: "100",
          }}
        >
          {props.internationalTeamsList.map((each, index) => {
            return (
              <InterestsCard
                key={each.label}
                image={"each.image"}
                label={each.label}
                value = {each.value}
                disable = {each.disable}
                handleAddInterestToArray={props.handleAddInterestToArray}
              />
            );
          })}
        </div>
      </SHideScroll>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button onClick={props.handleChangeTheCurrentPage}>Prev</Button>
        <Button onClick={handleSubmitInterestsArray}>Save</Button>
      </div>
    </SEditPageTwo>
  );
}

export default EditPageTwo;
