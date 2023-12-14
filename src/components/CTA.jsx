import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
    return (
        <section className='cta'>
            <p className='cta-text'>Got a project idea brewing? <br className='sm:block hidden' />
                Let's team up and transform your vision into an amazing reality!<br className='sm:block hidden' />Together, we'll bring your ideas to life!</p>

            <Link to={'/contact'} className='btn'>
                Contact
            </Link>

        </section>
    )
}

export default CTA