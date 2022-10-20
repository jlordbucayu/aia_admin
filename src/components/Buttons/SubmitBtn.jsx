import React from 'react'

const SubmitBtn = ({handleSubmit,type}) => {
  return (
    <div className='mb-[50px]'>
        <button className='bg-[#D31145] text-white px-5 py-2 rounded' type={type} onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SubmitBtn