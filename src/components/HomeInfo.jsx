import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg';

const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} alt="arrow" />
        </Link>
    </div>
)
const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Ramanand Thakur</span>👋<br />
            A Software Engineer from India

        </h1>
    ),
    2: (
        <InfoBox
            text={"Crafting digital marvels with code, I'm a software engineer transforming ideas into extraordinary tech solutions.✨"}
            link={"/about"}
            btnText={'Learn more'}
        />
    ),
    3: (
        <InfoBox
            text={"Dive into my world of innovation! From sleek web interfaces to robust mobile solutions, my projects blend creativity and functionality seamlessly.🌟"}
            link={"/projects"}
            btnText={'Visit my portfolio'}
        />),
    4: (
        <InfoBox
            text={"Need a project to come to life? Seeking a software developer? I'm here, just a few keystrokes away,ready to bring your ideas to life! ✨"}
            link={"/contact"}
            btnText={"Let's talk about your ideas"}
        />
    ),
}
const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;

}

export default HomeInfo