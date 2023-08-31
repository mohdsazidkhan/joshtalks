import React from 'react'
import { useSelector } from 'react-redux';

function Final() {
  const userAnswers = useSelector(state => state.userAnswers);

  return (
    <div className='bg-gray-900 h-full flex flex-col px-4 md:px-60 py-5'>
      <div className='text-white text-2xl mb-5 font-bold'>
        Quiz Report
      </div>
      {userAnswers?.map((item,index)=>
        <div className='mb-3' key={index}>
          <div className='text-xl text-white mb-2'>{index+1}{'. '}{item?.question}</div>
          <div className='text-base mb-2 text-yellow-500'>Your Answer: {item?.userAns}</div>
          <div className='text-base text-green-500 mb-2'>Corrent Answer: {item?.correctAns}</div>
        </div>
      )}
    </div>
  )
}

export default Final