import React from 'react'

const Footer = () => {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center txtsm leading-loose text-muted-foreground md:text-left">
                Built by <a href="https://github.com/ChackoTacko" target='_blank' className="font-semibold underline underline-offset-4">Robert Lowe</a>.
                The source code is available on <a href="https://github.com/ChackoTacko/Netflix-Clone-MERN-Stack" target='_blank' className="font-semibold underline underline-offset-4">GitHub</a>. This site is a clone for educational purposes only.
            </p>
        </div>
    </footer>
  )
}

export default Footer