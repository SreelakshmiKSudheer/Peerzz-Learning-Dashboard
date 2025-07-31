import React from 'react'

const Hero = ({ bgImage, bgColor }) => {
    return (
        <div className='mb-10'>
            <div className="w-[90%] h-[60vh] mx-auto bg-cover bg-center rounded-4xl flex justify-end relative"
            style={{ backgroundColor: bgColor }}>
                <img src={bgImage} alt="hero" className='w-full h-[60vh] object-cover rounded-4xl object-top-left' />
                <h2 className='text-6xl font-bold text-[var(--tri)] absolute bottom-60 left-10'>Welcome to Peerzz</h2>
                <p className='text-xl text-[var(--tri)] absolute bottom-50 left-12'>Make your learning easy, career bright</p>
            </div>
        </div>


    )
}

export default Hero