'use client'
// import { getServerSession } from 'next-auth'
import React from 'react'
// import { authOptions } from '../../utils/authOptions'
import axios from 'axios'

const page = () => {
  // getting the user data such as firstName, lastName, and email
  // const data = await getServerSession(authOptions)
  // console.log(data)

  // this is for update, the JSON should be well structured
  const payload = {
    "primaryContact": {
      "email": "emiedonmokumo@volariscapital.com",
    }
  }

  // this is for post request
  // const payload = {
  //   "companyInfo": {
  //     "companyName": "Volaris Capital",
  //     "country": "USA",
  //     "city": "San Francisco",
  //     "website": "https://volariscapital.com",
  //     "yearFounded": 2010,
  //     "employeeNumber": 200,
  //     "investorType": "Strategic",
  //     "description": "Volaris Capital is a strategic investor specializing in software companies."
  //   },
  //   "investmentBio": {
  //     "industry": "Software",
  //     "geography": "North America",
  //     "dealsInLTM": 5,
  //     "medianDealSize": 50000000,
  //     "AUM": 2000000000,
  //     "dealsIn5Y": 20
  //   },
  //   "targetInfo": {
  //     "revenue": {
  //       "from": 3000000,
  //       "to": 17000000
  //     },
  //     "EBITDA": {
  //       "from": 1200000,
  //       "to": 6800000
  //     },
  //     "dealSize": {
  //       "from": 2000000,
  //       "to": 5000000
  //     }
  //   },
  //   "paidInfo": {
  //     "valuation": {
  //       "from": 10000000,
  //       "to": 70000000
  //     },
  //     "revenue": {
  //       "from": 3000000,
  //       "to": 17000000
  //     },
  //     "EBITDA": {
  //       "from": 1200000,
  //       "to": 6800000
  //     }
  //   },
  //   "primaryContact": {
  //     "name": "Emie",
  //     "surname": "Boro",
  //     "email": "emieboro8@volariscapital.com",
  //     "phone": "+1(415)555-1234",
  //     "title": "Investment Director"
  //   },
  //   "vertical": "Software",
  //   "status": "Data Exchange",
  //   "matchScore": {
  //     "totalScore": 85,
  //     "revenueScore": 90,
  //     "ebitdaScore": 80,
  //     "dealsScore": 70,
  //     "investorTypeScore": 75,
  //     "industryScore": 85,
  //     "dealSizeScore": 90
  //   }
  // }

  const handleTest = async () =>{
    // const response = await axios.post('/api/investors', payload) // this is for posting new investor
    // const response = await axios.get('/api/investors') //this is for getting all investors,

    // const response = await axios.get('/api/investors/66e187858f191cc51aebfce9') // to get a single investor
    // const response = await axios.put('/api/investors/66e187858f191cc51aebfce9', payload) // to update a single investor
    // const response = await axios.delete('/api/investors/66e187858f191cc51aebfce9') // to delete a single investor
    if(response.status == 200) {
      console.log(await response.data)
    }
  }

  return (
    <div className='p-5'>
      <h1 className="text-2xl font-bold">Welcome to Goodplace CRM</h1>
      {/* <h1 className="text-2xl">{data.user.id}</h1> */}
      {/* <h1 className="text-2xl">{new Date(data.exp).toLocaleString()}</h1> */}
      <button onClick={handleTest} className=''>Test API route</button>
    </div>
  )
}

export default page