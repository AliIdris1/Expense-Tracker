import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard.jsx'
import moment from 'moment'

const RecentIncome = ({transaction, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transaction?.slice(0, 5)?.map((items) => (
                <TransactionInfoCard
                key={items._id}
                title={items.source}
                icon={items.icon}
                date={moment(items.date).format("Do MMM YYYY")}
                amount={items.amount}
                type="income"
                hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome