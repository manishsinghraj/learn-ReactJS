import React, { useState } from 'react'
import "./carousel.css"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export const Carousel = ({ data }) => {
    const slides = data.slides || null;

    const [slide, setSlide] = useState(0);

    const prevSlide = () => {
        setSlide(slide === 0 ? slides.length - 1 : slide - 1)
    }

    const nextSlide = () => {
        setSlide(slide === slides.length - 1 ? 0 : slide + 1)
    }


    return (
        <div className='carousel'>
            <FaArrowAltCircleLeft
                className='arrow arrow-left'
                onClick={prevSlide}
            />

            {slides.map((item, index) => {
                return <img
                    src={item.src}
                    alt={item.alt}
                    key={index}
                    className={slide === index ? "slide" : "slide slide-hidden"}
                />
            })}

            <FaArrowAltCircleRight
                className='arrow arrow-right'
                onClick={nextSlide}
            />

            <span className='indicators'>

                {slides.map((_, index) => {
                    return <button
                        className={slide === index ? 'indicator' : 'indicator indicator-inactive'}
                        key={index}
                        onClick={() => setSlide(index)}>
                    </button>
                })}

            </span>
        </div>
    )
}
