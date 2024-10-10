'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {

    const handleClick = async () => {

        try {
            const investor = await axios.get(`/api/investors/${investorId}`)
            if(investor.status == 200) console.log(investor.data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className=''>
            <h1>Welcome to CRM page</h1>

            <button onClick={handleClick} className='border'>Test Button</button>
        </div>
    )
}

export default page
