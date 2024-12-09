import React from 'react'
import PaymentSearch from './PaymentSearch'

const PaymentHeader = () => {
  return (
    <div className="flex justify-between items-center gap-y-10">
      <h1 className='font-bold tetx-2xl'>Payment History</h1>
      <PaymentSearch/>
    </div>
  )
}

export default PaymentHeader
