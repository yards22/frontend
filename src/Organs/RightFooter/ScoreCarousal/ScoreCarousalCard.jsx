import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import styled from 'styled-components';

const SScoreCarousalCard = styled.div`
   height : 200px;
   width : 300px;
   border : 1px solid brown;
   margin : 0px;
   display : flex;
   justify-content : center;
   align-items : center;
`

function ScoreCarousalCard(props) {
  return (    
    <SScoreCarousalCard>
           {props.match}
    </SScoreCarousalCard>
  )
}

export default ScoreCarousalCard