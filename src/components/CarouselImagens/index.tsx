import { useState } from "react";
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, UncontrolledCarousel } from "reactstrap";

interface CarouselImagensProps {
  data: FotoTypes[];
}

export function CarouselImagens(props: CarouselImagensProps) {
  const { data } = props;

  return (
    <UncontrolledCarousel
      style={{ height: '50px', width: '50px' }}
      items={data.map((item, index) => {
        const { id, url } = item;

        return {
          // altText: `Slide-${id}-${index}`,
          // caption: `Slide-${id}-${index}`,
          key: `${id}-${index}`,
          src: url
        };
      })}
    />
  );
}

interface CarouselFotosIndicatorsProps {
  data: FotoTypes[];
  activeIndex: number;
}

function CarouselFotosIndicators(props: CarouselFotosIndicatorsProps) {
  const { data, activeIndex } = props;

  return (
    <CarouselIndicators
      activeIndex={activeIndex}
      items={data.map((item, index) => {
        const { id, url } = item;
        return {
          altText: `Slide-${id}-${index}`,
          caption: `Slide-${id}-${index}`,
          key: index,
          src: url
        }
      })}
      onClickHandler={function noRefCheck() { }} // Arrumar
    />
  );
}

interface CarouselFotosItemProps {
  data: FotoTypes;
  index: number;
  onExited: () => void;
  onExiting: () => void;
}

function CarouselFotosItem(props: CarouselFotosItemProps) {
  const { id, url } = props.data;
  const { index, onExited, onExiting } = props;

  return (
    <CarouselItem
      onExited={onExited}
      onExiting={onExiting}
    >
      <img
        alt={`Slide-${id}-${index}`}
        src={url}
      />
      <CarouselCaption
        captionHeader={`Slide-${id}-${index}`}
        captionText={`Slide-${id}-${index}`}
      />
    </CarouselItem>
  );
}

interface CarouselFotosProps {
  data: FotoTypes[];
  slide: boolean;
}

export function CarouselFotos(props: CarouselFotosProps) {
  const { data, slide } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  // Items array length
  const itemLength = data.length - 1
  
  // Previous button for Carousel
  const previousButton = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ?
          itemLength : activeIndex - 1;
      setActiveIndex(nextIndex);
  }

  // Next button for Carousel
  const nextButton = () => {
      if (animating) return;
      const nextIndex = activeIndex === itemLength ?
          0 : activeIndex + 1;
      setActiveIndex(nextIndex);
  }

  return (
    <Carousel
      activeIndex={activeIndex}
      next={nextButton}
      previous={previousButton}
      slide={slide}
    >
      <CarouselFotosIndicators
        data={data}
        activeIndex={activeIndex}
      />
      {data.map((item, index) => {
        return (
          <CarouselFotosItem
            data={item}
            index={index}
            onExited={() => setAnimating(false)}
            onExiting={() => setAnimating(true)}
          />
        );
      })}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previousButton} // Arrumar
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={nextButton} // Arrumar
      />
    </Carousel>
  );
}