import React, { useState, useEffect, useRef } from 'react';

export default function CarouselTransition() {
 const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);
    const intervalRef = useRef(null);
    

    const handlePreviousClick = () => {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setIsAnimated(true);
    };

    const handleNextClick = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimated(true);
    };

    useEffect(() => {
      intervalRef.current = setInterval(handleNextClick, 15000);
      return () => clearInterval(intervalRef.current);
    }, []);

    const handleMouseEnter = () => {
      clearInterval(intervalRef.current);
    };

    const handleMouseLeave = () => {
      intervalRef.current = setInterval(handleNextClick, 15000);
    };

    return (
      <>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex justify-center items-center"
        >
          <div className='w-screen'>
            {images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt="" 
                className={`w-full height_img_carrousel object-cover object-center absolute top-0 left-0 ${index !== currentImageIndex && 'opacity-0'}`}
                onAnimationEnd={() => setIsAnimated(false)}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex justify-between items-center ">
          <button className='bg-white rounded-full' onClick={handlePreviousClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
          <button className='bg-white rounded-full' onClick={handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </>
     );
     
     
 };

 const images = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
 ];

 images.push(...images);

 return <ImageCarousel images={images} />;
}
