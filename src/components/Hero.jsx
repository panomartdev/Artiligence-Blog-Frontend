import React from "react";
import HeroImg from "../assets/hero.jpg";
import "./style/Hero.scss";

const Hero = () => {
    return(
        <section className="hero-section">
            <div className="hero-section-content container">
                <div className="hero-section-texts">
                    <h2 className="hero-section-title"><span className="maintxt-one">Arti</span><span className="maintxt-two">ligence</span> </h2>
                    <p className="hero-section-description">Explore , Discover , Dive into the ever-evolving Universe of technology </p>
                </div>
                <div className="hero-section-img">
                    <img src={HeroImg}/>
                </div>
            </div>
                
        </section>
    )
}

export default Hero;