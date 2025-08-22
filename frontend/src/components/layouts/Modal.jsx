import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
  if(!isOpen) return null;
  return <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
    <div className='relative p-4 w-full max-w-2xl max-h-full'>
      {/* Modal Content */}
      <div className='relative bg-white shadow-sm rounded-lg dark:bg-gray-700'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 '>
          <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
          <button type='button' onClick={onClose} className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer ' >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>

          </button>
        </div>

        {/* Modal body */}
        <div className='p-4 md:p-5 space-y-4'>
          {children}
        </div>
      </div>
    </div>
  </div>
}

export default Modal