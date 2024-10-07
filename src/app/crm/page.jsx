'use client'
import React from 'react'
import axios from 'axios'

const page = () => {
    const handleClick = async () =>{
        // const contactObj = {
        //     properties: {
        //       firstname: 'Emiedonmokumo',
        //       lastname: 'Dick-Boro',
        //       email: 'emieboro8@gmail.com',
        //     },
        // }
    
        const response = await axios.get('https://api.hubapi.com/crm/v3/properties/contacts', {
            headers: {
                Authorization: 'Bearer pat-na1-de50b3f8-817a-4de5-95cf-a1084908c475'
            }
        });
        const json = await response.data
        console.log(json)
    }

  return (
    <div className=''>
      <h1>Welcome to CRM page</h1>

      <button onClick={handleClick} className='border'>Test CRM</button>
    </div>
  )
}

export default page
