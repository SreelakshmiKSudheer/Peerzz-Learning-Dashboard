import React from 'react'

const Card = (props) => {
  return (
    <div className='rounded-lg flex flex-col items-center justify-center w-70 h-70 my-8'>
      <div className='w-full h-50 overflow-hidden rounded-t-lg'>
        <img src={props.image} alt="Card Image" className=' object-cover rounded-t-lg' />
      </div>
      <div className='p-4 bg-[var(--bi)] rounded-b-lg  text-[var(--tri)] w-full h-full'>
        <h2 className='text-lg font-semibold'>{props.title}</h2>
        <p className='text-[var(--tri-light)]'>{props.description}</p>
        <div className='flex justify-between mt-2 text-[var(--tri-light)] text-sm'>
          <p>{props.det1}</p>
          <p>{props.det2}</p>
        </div>
        <div className='flex justify-between mt-2 text-[var(--tri-light)] text-sm'>
          <p>{props.det3}</p>
          <p>{props.det4}</p>
        </div>
        <div className='flex justify-end w-full'>
          <button className='mt-4 bg-[var(--quad)] text-white px-2 py-1 rounded hover:bg-[var(--quad-dark)] transition-colors text-sm'>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card