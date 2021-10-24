import React, { useState } from 'react';
import './About.scss';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container,
  CarouselCaption,
} from 'reactstrap';
import dev1 from '../../image/dev1.jpg';
import dev2 from '../../image/dev2.jpg';
import dev3 from '../../image/dev3.jpg';
import dev4 from '../../image/dev4.jpg';
import dev5 from '../../image/dev5.jpg';
import dev6 from '../../image/dev6.jpg';
import dev7 from '../../image/dev7.jpg';
import dev8 from '../../image/dev8.jpg';
import dev9 from '../../image/dev9.jpg';
import dev10 from '../../image/dev10.jpg';
const About = () => {
  const items = [
    {
      src: dev1,
      altText: 'Web',
      caption: '60150068',
      header: '중어중문학과 박정훈',
      key: '1',
    },
    {
      src: dev2,
      altText: 'Web, DB',
      caption: '60161605',
      header: '융합소프트웨어학부 박이건',
      key: '2',
    },
    {
      src: dev3,
      altText: 'Server',
      caption: '60180998',
      header: '경영학과 이서현',
      key: '3',
    },
    {
      src: dev4,
      altText: 'PM, Architecture, App',
      caption: '60181665',
      header: '융합소프트웨어학부 정상현',
      key: '4',
    },
    {
      src: dev5,
      altText: 'PM, QA, Server',
      caption: '60181640',
      header: '융합소프트웨어학부 박정욱',
      key: '5',
    },
    {
      src: dev6,
      altText: 'QA, App',
      caption: '60181626',
      header: '융합소프트웨어학부 김송은',
      key: '6',
    },
    {
      src: dev7,
      altText: 'DB, App',
      caption: '60160395',
      header: '문예창작학과 윤예은',
      key: '7',
    },
    {
      src: dev8,
      altText: 'App',
      caption: '60141036',
      header: '융합소프트웨어학부 신동욱',
      key: '8',
    },
    {
      src: dev9,
      altText: 'Web',
      caption: '60171671',
      header: '융합소프트웨어학부 홍은서',
      key: '9',
    },
    {
      src: dev10,
      altText: 'Server',
      caption: '60161633',
      header: '융합소프트웨어학부 정찬호',
      key: '10',
    },
  ];
  //광고부분
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
  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="devItem"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="devFace" src={item.src} alt={item.altText} />
        <CarouselCaption
          className="devCaption"
          captionText={item.caption}
          captionHeader={item.header}
        />
      </CarouselItem>
    );
  });
  return (
    <div className="aboutDev">
      <Container className="devCon">
        <div className="devImg">
          <Carousel
            className="devCarousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              className="devIndi"
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />

            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default About;
