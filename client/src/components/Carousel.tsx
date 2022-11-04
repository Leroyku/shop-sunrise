// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstImg from '../assets/carousel/1.jpg';
import secondImg from '../assets/carousel/2.jpg';
import thirdImg from '../assets/carousel/3.jpg';
import fourthImg from '../assets/carousel/4.jpg';

function Slider() {
  return (
    <Carousel className="slider">
      <Carousel.Item>
        <img className="d-block slider__img" src={firstImg} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block slider__img" src={secondImg} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block slider__img" src={thirdImg} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block slider__img" src={fourthImg} alt="Fourth slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
