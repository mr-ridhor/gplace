import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../utils/authOptions'

const page = async () => {
  const data = await getServerSession(authOptions)
  console.log(data.user.id)

  return (
    <div className='p-5'>
      <h1 className="text-2xl font-bold">Welcome to Goodplace CRM</h1>
    </div>
  )
}

export default page
