import { Divider ,Title ,Table } from '@mantine/core'
import React from 'react'




const CommentrySection = () => {
  return (
    <>
      <Divider size= "sm" />
      <Title order={4} weight={500} align="center">Commnentry</Title>
      <Divider size= "sm" />
      <div className="container mt-5">

      <Table withColumnBorders withBorder>
        <thead  className='md:font-bold font-light'>
        <tr>
          <th>18.2</th>
          <th>wicket</th>
          <th>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nisi delectus accusantium, natus cum eum beatae ratione recusandae quod, consequatur quam ipsam pariatur, libero labore consequuntur reprehenderit odio minima est.</th>
        </tr>
        </thead>
    </Table>

      </div>
    </>
  )
}
export default CommentrySection