import React from 'react'
import { skills } from '../constants'

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello 👋, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Ramanand</span>
      </h1>

      <div className="mt-5 gap-3 flex flex-col text-slate-500">
        <p>A seasoned software engineer from India! With expertise in MERN stack👨🏻‍💻, React Native⚛, and Android development📱, I craft versatile digital solutions that blend innovation and efficiency🌟.</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className='subhead-text '>My Skills</h3>

        <div className="mt-6 flex flex-wrap gap-12">

          {skills.map((skill)=>(
            <div className="block-container w-20 h-20">
            <div className="btn-back rounded-xl " />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img src={skill.imageUrl} alt={skill.name}
                className='w-1/2 h-1/2 object-contain' />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6">
        <h3 className="subhead-text">Work Experience</h3>
        <p className="flex mt-5 flex-col gap-3 text-slate-500">From diverse companies to collaborating with brilliant minds, I've evolved my skills and , fostering rich experiences. Here's a glimpse into my dynamic journey🚀.</p>
        
      </div>
    </section>
  )
}

export default About