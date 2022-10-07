import { Avatar, Button, Group, Tabs, Text } from "@mantine/core";
import styled from "styled-components";
import { forwardRef, useEffect, useState } from 'react';
import { MultiSelect } from '@mantine/core';
import InterestsCard from "./InterestsCard";
import { interestsDummyData } from "../../../../../Data/Dummies/Interests";

const SEditPageTwo = styled.div`
   width: 100%;
   margin-bottom: 50px;
`;

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text>{label}</Text>
        </div>
      </Group>
    </div>
  )
);


interface EditPageTwoProps{
    handleChangeTheCurrentPage (): void,
    handleSubmitNewUserDetails (interestsString : string) : void
}

function EditPageTwo(props:EditPageTwoProps) {
  const [interestsArray,setInterestsArray] = useState<any[]>([]);
  const [activeInterestTab, setActiveInterestTab] = useState("internationalTeams")

  const handleAddInterestToArray = (interest:any)=>{
      let w = interestsArray;
      interestsArray.push(interest)
      setInterestsArray([...w])
  }

  const handleRemoveInterestFromArray = (interest:string) => {
    var w = interestsArray.filter(each => each!== interest);
    setInterestsArray([...w]); 
  }

  const handleSubmitInterestsArray = ()=>{
    let interestsString = interestsArray.join(",");
    props.handleSubmitNewUserDetails(interestsString)
  }

  useEffect(()=>{
     console.log("interests",interestsArray)
  },[interestsArray])


  return (
    <SEditPageTwo>
         <h3>Choose Your Interests</h3>
         <MultiSelect
            data={interestsDummyData}
            itemComponent = {SelectItem}
            placeholder="Pick all that you like"
            searchable
            value={interestsArray}
            onChange={(e:any)=>{ setInterestsArray(e)}}
            nothingFound="Nothing found"
            clearable
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
          />
          <Tabs onTabChange={(e:any)=>setActiveInterestTab(e)}>
            <Tabs.List style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
              <Tabs.Tab value="internationalTeams">INTL Teams</Tabs.Tab>
              <Tabs.Tab value="leaguesAndTournaments" >Leagues</Tabs.Tab>
              <Tabs.Tab value="domesticLeagues">Domestic</Tabs.Tab>
              <Tabs.Tab value="players">Players</Tabs.Tab>
            </Tabs.List>
          </Tabs>
         <div style={{
             display : "flex",
             flexWrap : "wrap",
             width : "100%",
             justifyContent : "space-around",
             overflow: "scroll",
             marginTop: "15px",
             maxHeight : "190px",
             flexShrink : "100",
             
             border : "1px solid black"
         }}>
            {
              interestsDummyData.map((each,index)=>{
                return (
                   <InterestsCard
                     key={each.image} 
                     image = {each.image}
                     label = {each.label}
                     description = {each.description}
                     handleAddInterestToArray = {handleAddInterestToArray}
                    />
              )})
            }
         </div>
         <div style={{
           display : "flex",
           width : '100%',
           justifyContent : "space-between",
           marginTop : "10px"
         }}>
            <Button
              onClick = {props.handleChangeTheCurrentPage}
            >
              Prev
            </Button>
            <Button
              onClick = {handleSubmitInterestsArray}
            >
              Save
            </Button>
         </div>
    </SEditPageTwo>
  )
}

export default EditPageTwo