import React, { useState } from 'react';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

const FoodImageCarousel = ({ image, metaImage }) => {
  const items = [
    {
      src: image,
    },
    {
      src: metaImage,
    },

  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const onClickItem = (src) => {
    let name = 'image detail';
    let option = 'width = 500, height = 500, top = 100, left = 200, location = no';
    window.open(src, name, option);
  };


  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} onClick={()=> onClickItem(item.src)} style={{cursor:'pointer'}} />
      </CarouselItem>

    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
      <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
    </Carousel>
  );
};

export default FoodImageCarousel;