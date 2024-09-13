'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import axios from 'axios'
// import { getUser } from '../../utils/getUser'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  // router.push('/dashboard')
  const handleTest = async () => {
    // const response = await axios.get('/api/investors')

    // const response = axios.post('/api/signup', payload)
    // const response = await axios.post('/api/investors', payload) // this is for posting new investor
    // const response = await axios.get('/api/investors') //this is for getting all investors,
    // const response = await axios.get('/api/investors/66e187858f191cc51aebfce9/contact') // to get or post

    // const response = await axios.get('/api/investors/66e187858f191cc51aebfce9') // to get a single investor
    // const response = await axios.put('/api/investors/66e187858f191cc51aebfce9', payload) // to update a single investor
    // const response = await axios.delete('/api/investors/66e187858f191cc51aebfce9') // to delete a single investor
    if (response.status == 200) {
      console.log(await response.data)
    }
  }

  // const user = await getUser()

  return (
    <div className='p-5'>
      <h1 className="text-2xl font-bold">Welcome to Goodplace CRM</h1>
      {/* <h1 className="text-2xl">{user.id} {user.email}</h1> */}
      {/* <h1 className="text-2xl">{user.firstName} {user.lastName}</h1> */}
      {/* <button onClick={handleTest} className=''>Test API route</button> */}
      <button className='mx-8 p-2 border' onClick={()=> signOut({ callbackUrl: '/auth/login' })}>Signout</button>
    </div>
  )
}

export default page

  // getting the user data such as firstName, lastName, and email
  // const data = await getServerSession(authOptions)
  // console.log(data)

  // this is for update, the JSON should be well structured
  // const payload = {
  //   "primaryContact": {
  //     "email": "emiedonmokumo@volariscapital.com",
  //   }
  // }
  

//  signup payload
  // const payload = {
  //   "bio": {
  //     "firstName": "Emie", // (required)
  //     "lastName": "Boro", // (required)
  //     "title": "Software Engineer", // (required)
  //     "email": "emieboro8@gmail.com", // (required)
  //     "linkedIn": "https://www.linkedin.com/in/emieboro8", // (optional)
  //     "X": "@emieboro8", // (optional)
  //     "country": "USA", // (required)
  //     "city": "New York", // (required)
  //     "address": "123 Main St, New York, NY 10001" // (required)
  //   },
  //   "company": {
  //     "name": "Whitebeard Inc.", // (required)
  //     "country": "USA", // (required)
  //     "city": "New York", // (required)
  //     "email": "info@whitebeard.com", // (required)
  //     "website": "https://www.whitebeard.com", // (optional)
  //     "industry": "Technology", // (required)
  //     "foundingYear": 2010, // (required)
  //     "revenue": {
  //       "ltm": 5000000, // (required) Last Twelve Months Revenue
  //       "previousYear": 4500000 // (required)
  //     },
  //     "grossProfit": {
  //       "ltm": 2000000, // (required)
  //       "previousYear": 1800000 // (required)
  //     },
  //     "EBITDA": {
  //       "ltm": 1000000, // (required) Last Twelve Months EBITDA
  //       "previousYear": 900000 // (required)
  //     }
  //   },
  //   "team": {
  //     "team1": {
  //       "fullName": "Alice Johnson", // (optional)
  //       "role": "Product Manager" // (optional)
  //     },
  //     "team2": {
  //       "fullName": "Bob Smith", // (optional)
  //       "role": "Lead Developer" // (optional)
  //     }
  //   },
  //   "credentials": {
  //     "email": "emieboro8@gmail.com", // (required)
  //     "password": "12345678" // (required)
  //   }
  // }


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
  // }