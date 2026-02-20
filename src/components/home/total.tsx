import React, { type FC } from 'react'

interface Props {
  totalCount: number
  filteredCount: number
}

const Total:FC<Props> = ({totalCount, filteredCount}) => {
  return (
    <div className='mt-8 text-text-secondary text-sm flex justify-between'>
        <div>
          <span className='text-text-primary'>
            {filteredCount}
          </span> 
          {filteredCount === 1 ? ' note' : ' notes'} found, total <span className='text-text-primary'>({totalCount})</span>
        </div>
    </div>
  )
}

export default Total