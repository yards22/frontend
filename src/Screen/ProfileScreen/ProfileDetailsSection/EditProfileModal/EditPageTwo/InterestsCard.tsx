import { Group, Avatar, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import styled from "styled-components"

const SInterestsCard = styled.div`
   cursor: pointer;
`;

interface InterestsCardProps{
  image: string,
  label: string,
  description: string,
  handleAddInterestToArray(interest: string) : void,
  all : any
  // handleRemoveInterestFromArray(interest : string) : void ,
  // interestsArray : string[]
}

function InterestsCard(props:InterestsCardProps) {
  const [isInterestSelected , setIsInterestSelected] = useState(false);

  useEffect(()=>{
    // if(props.interestsArray.includes(props.name)){
    //   setIsInterestSelected(true)
    // }
  })
  
  const handleInterestSelected = () =>{
    // if(isInterestSelected){
    //     setIsInterestSelected(false)
    //     props.handleRemoveInterestFromArray(props.name)
    // }else{
    //     setIsInterestSelected(true)
    //     props.handleAddInterestToArray(props.name)
    // }
    props.handleAddInterestToArray(props.label)
  }
  return (
    <SInterestsCard 
        key={props.label}
        onClick = {handleInterestSelected}
        style = {{
            backgroundColor : `${isInterestSelected ? "gray": ""}`
        }}
    >
         <div>
            <Group noWrap>
              <Avatar src={props.image} />

              <div>
                <Text>{props.label}</Text>
                <Text size="xs" color="dimmed">
                  {props.description}
                </Text>
              </div>
            </Group>
          </div>
    </SInterestsCard>
  )
}

export default InterestsCard