import React from 'react'

const CustomSection = ({ title, children }) => {
    return (
        <div className="w-full mb-16">
            <h2 className='font-bold text-2xl'>{title}</h2>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}

export default CustomSection