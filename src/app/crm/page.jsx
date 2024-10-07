'use client'
import React from 'react'

const page = () => {
    const handleClick = async () =>{

    
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
