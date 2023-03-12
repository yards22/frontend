import { Text, Title ,Table } from '@mantine/core'
import React from 'react'
import CommentrySection from './CommentrySection'
import { summary } from './Data'



const Summary = () => {
  return (
    <div>
        <div>
        <Title order={4} className= "flex my-2 justify-evenly"  color="blue">
          <span className="md:text-lg text-sm " > TEAM A : 100/5 (18.5)  </span>  
        <span className="md:mx-5 md:text-lg text-sm font-medium"  >CRR : 4.46 </span>
         <Text className="md:mx-5 md:text-lg text-sm"  >RRR : 5.56</Text> 
        </Title>
        <Title order={4} className= "flex my-2 justify-evenly"  color="dimmed">
          <span className="md:text-lg text-sm " > TEAM B : 100/5 (18.5)  </span>  
        <span className="md:mx-5 md:text-lg text-sm "  >CRR : 4.46 </span>
         <Text className="md:mx-5 md:text-lg text-sm"  >RRR : 5.56</Text> 
        </Title>
        </div>
       <div className='mt-5'>
       <Table horizontalSpacing="sm" verticalSpacing="sm" withBorder>
       <thead className='bg-gray-200'>
        <tr>
          <th>Batter</th>
          <th>R</th>
          <th>B</th>
          <th>4s</th>
          <th>6s</th>
          <th>SR</th>
        </tr>
      </thead>
      <tbody>
        {
            Object.values(summary.batsman) .map((value,index)=>{
                return (
                    <tr key ={index}>
                    <td>{value.name}  <p className='text-red-500 inline text-xl'>{value.is_strike && "*"}</p></td>
                    <td>{value.runs}</td>
                    <td> {value.balls} </td>
                    <td> {value.fours} </td>
                    <td> {value.sixes} </td>
                    <td> {value.strike_rate} </td>
                  </tr>
                )
            })
        }
      </tbody>
        </Table>
       </div>
       <div className='mt-5'>
       <Table horizontalSpacing="sm" verticalSpacing="sm" withBorder>
       <thead className='bg-gray-200'>
        <tr>
          <th>Bowler</th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>W</th>
          <th>ECO</th>
        </tr>
      </thead>
      <tbody>
        {
            Object.values(summary.bowler) .map((value,index)=>{
                return (
                    <tr key ={index}>
                    <td>{value.name}  <p className='text-red-500 inline text-xl'>{value.is_cur_bowler && "*"}</p></td>
                    <td>{value.overs}</td>
                    <td> {value.maiden} </td>
                    <td> {value.runs} </td>
                    <td> {value.wicket} </td>
                    <td> {value.economy} </td>
                  </tr>
                )
            })
        }
      </tbody>
        </Table>
       </div>
       <div className='my-5'>
        <Text className='flex mt-2 justify-evenly' lineClamp={1}>
          Recents :
          {
            summary.previous_balls.map((score, index) =>{
              return (
                <>
                <Text >
              {score !== -1 ? score : " | " }
              </Text>
                </> 
                
              )
            })
          }
        </Text>
       </div>
       <CommentrySection/>
    </div>
  )
}
export default Summary