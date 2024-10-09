'use client'
import React, { useEffect } from 'react'
import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    
});

// const hubspotClientId = '1dee7f16-f31e-4c05-bd53-bedcbce1762e'



const page = () => {
    // useEffect(() => {
        const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;


    // }, [])

    const handleClick = async () => {

        try {
            const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
            console.log(JSON.stringify(apiResponse, null, 2));
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    }

    return (
        <div className=''>
            <h1>Welcome to CRM page</h1>

            <button onClick={handleClick} className='border'>Test CRM</button>
        </div>
    )
}

export default page
