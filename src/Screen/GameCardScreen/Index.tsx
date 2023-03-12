import { Card, Text, Badge, NavLink } from '@mantine/core';
import {  useNavigate } from 'react-router-dom';





const GameCardIndex = () => {
  const navigate = useNavigate()
  const handleNavigateToScoreCard=()=>{
    navigate(`${match_id}`)
  }

  const isLive =true;
  const is_first_innings=true;
  const target=100;
  const cur_rr=4.44;
  const req_rr=4.14;
  const match_id =1;
  let miniText;
 if(!isLive){
  miniText =<Text>Team A won by 10 wickets</Text>
 }else{
  if(is_first_innings)  miniText=<Text className='inline' >Team B needs {target} runs in 6 overs <span > CRR : {cur_rr} </span> <span> RRR : {req_rr} </span> </Text>
  else miniText=<Text>Team A opts for bat</Text>
 }
    return (
<div className="grid grid-col-1 gap-2 mt-5">
    <Card shadow="sm" onClick={handleNavigateToScoreCard} className=" hover:cursor-pointer hover:shadow-2xl transition-shadow ease-in-out" radius="md" withBorder>
    <div className="mx-2 px-5 my-5">
      <div className="flex justify-between my-2 items-center">
      <Text >
          6th mar,2023 3:00PM
        </Text>
        {
          isLive && (<Badge color="red" size="md">Live Now</Badge>)
        }
        
      </div>
      <div className="flex justify-between my-5 px-10">
        <div className="flex ">
           <Text className='flex items-center'>India</Text>
           <Text className='ml-10 flex items-center flex-col justify-center'>
            100/2
            <Text size="sm" >(12.3)</Text>
           </Text>
          
        </div>
        <div className="flex ">
           
           <Text className='mr-10 flex items-center flex-col justify-center'>
            100/2
            <Text size="sm" >(12.3)</Text>
           </Text>
           <Text className='flex items-center'>India</Text>
          
        </div>

      </div>
      <div className='flex justify-center items-center'>
        {miniText}
      </div>
    </div>
    </Card>     
    
</div>
  );
}
export default GameCardIndex