import React from 'react'

import { PANELS_DATA } from '../utils/constants.utils'

const Panels = () => {
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            {PANELS_DATA.map((panel) => (
                <div key={panel.text} className='w-full bg-custom-gradient flex flex-col justify-between rounded-xl p-6 pb-4'>
                    <h3 className='text-xl font-bold'>{panel.title}</h3>
                    <p className='text-base'>{panel.text}</p>
                    <panel.icon className="self-end" />
                </div>
            ))}
        </div>
    )
}

export default Panels