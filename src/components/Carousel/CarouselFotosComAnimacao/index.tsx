import { useState } from "react";
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
// import { CarouselCaption } from "reactstrap";
import styled from "styled-components";

interface CarouselFotosComAnimacaoProps {
  data: FotoTypes[];
}

export function CarouselFotosComAnimacao(props: CarouselFotosComAnimacaoProps) {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  const itemLength = data.length - 1;

  const previousButton = () => {
    if (animating) { return; }
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const nextButton = () => {
    if (animating) { return; }
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={nextButton}
      previous={previousButton}
      slide={true}
      autoPlay={false}
    >
      <CarouselIndicators
        activeIndex={activeIndex}
        items={data.map((item, index) => {
          const { id, url } = item;
          return {
            // altText: `Slide-${id}-${index}`,
            // caption: `Slide-${id}-${index}`,
            key: `${id}-${index}`,
            src: url
          };
        })}
        onClickHandler={(newIndex) => {
          if (animating) { return; }
          setActiveIndex(newIndex);
        }} />
      {data.map((item, index) => {
        const { id, url } = item;
        return (
          <CarouselItem
            key={index}
            onExited={() => setAnimating(false)}
            onExiting={() => setAnimating(true)}
          >
            <CarouselItemImg
              key={index}
              alt={`Slide-${id}-${index}`}
              src={url} />
            {/* <CarouselCaption
              captionHeader={`Slide-${id}-${index}`}
              captionText={`Slide-${id}-${index}`} /> */}
          </CarouselItem>
        );
      })}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previousButton} />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={nextButton} />
    </Carousel>
  );
}

const CarouselItemImg = styled.img`
  width: 300px;
`;
