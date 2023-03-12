
import { Tabs, Title ,Badge ,Text  } from '@mantine/core';
import Summary from './Summary';



const ScoreCard = () => {
  return (
    <div className='px-5 py-10'>
      <div className='flex items-center justify-evenly mb-5'>
     <Text fw={700} className='md:text-3xl text-2xl '>
      TEAM A vs TEAM B
      <Badge color="red" size="md" className=' ml-5'>Live NOW</Badge>
     </Text>
      
      </div>
      <div className='flex justify-evenly items-center mt-2 mb-5'>
      <Text fz="sm" fw={400}>venue : venue</Text>
      <Text fz="sm" fw={400}>Date : Date </Text>
      </div>
     
    <Tabs defaultValue="summary">
    <Tabs.List grow position="center">
      <Tabs.Tab value="summary" >Summary</Tabs.Tab>
      <Tabs.Tab value="TEAM A">TEAM A</Tabs.Tab>
      <Tabs.Tab value="TEAM B">TEAM B</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="summary" pt="md">
      <Summary/>
    </Tabs.Panel>

    <Tabs.Panel value="TEAM A" pt="xs">
      TEAM A scorecard
    </Tabs.Panel>

    <Tabs.Panel value="TEAM B" pt="xs">
     TEAM b score card
    </Tabs.Panel>
  </Tabs>
  </div>
  );
}
export default ScoreCard