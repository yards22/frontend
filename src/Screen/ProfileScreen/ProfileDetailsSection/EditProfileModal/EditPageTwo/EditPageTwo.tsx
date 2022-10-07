import { Avatar, Button, Group, Text } from "@mantine/core";
import styled from "styled-components";
import { forwardRef, useEffect, useState } from 'react';
import { MultiSelect } from '@mantine/core';
import InterestsCard from "./InterestsCard";
import { interestsDummyData } from "../../../../../Data/Dummies/Interests";

const SEditPageTwo = styled.div`
   width: 100%;
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
          <Text size="xs" color="dimmed">
            {description}
          </Text>
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
  const [searchValue, onSearchChange] = useState('');

  const handleAddInterestToArray = (interest:any)=>{
      // setInterestsArray([...interestsArray,interest]);
      console.log(interest)
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
     console.log(interestsArray)
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
         <div style={{
             display : "flex",
             flexWrap : "wrap",
             width : "100%",
             border: "1px solid black",
             justifyContent : "center",
             height: "100%",
             overflow: "scroll",
             marginTop: "15px"
         }}>
            {
              interestsDummyData.map((each,index)=>{
                return (
                   <InterestsCard
                     key={each.image} 
                     image = {each.image}
                     label = {each.label}
                     description = {each.description}
                     all = {each}
                     handleAddInterestToArray = {handleAddInterestToArray}
                    //  handleRemoveInterestFromArray = {handleRemoveInterestFromArray}
                    //  interestsArray = {interestsArray}
                    />
              )})
            }
         </div>
         <>
            <Button
              style={{
                position: "absolute",
                bottom: "5px",
                left: "5px"
              }}
              onClick = {props.handleChangeTheCurrentPage}
            >
              Prev
            </Button>
            <Button
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px"
              }}
              onClick = {handleSubmitInterestsArray}
            >
              Save
            </Button>
         </>
    </SEditPageTwo>
  )
}

export default EditPageTwo