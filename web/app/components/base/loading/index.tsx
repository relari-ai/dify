import React from 'react'

import './style.css'
type ILoadingProps = {
  type?: 'area' | 'app'
}
const Loading = (
  { type = 'area' }: ILoadingProps = { type: 'area' },
) => {
  return (
    <div className={`flex w-full items-center justify-center ${type === 'app' ? 'h-full' : ''}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="spin-animation">
        <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="20" />
      </svg>
    </div>
  )
}

export default Loading
