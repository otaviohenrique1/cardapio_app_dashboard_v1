import { useState } from "react";
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import styled from "styled-components";
import { ModalImagem } from "../Modals";

interface CarouselFotosProps {
  data: FotoTypes[];
}

export function CarouselFotos(props: CarouselFotosProps) {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemLength = data.length - 1;

  const previousButton = () => {
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const nextButton = () => {
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={nextButton}
      previous={previousButton}
      slide={false}
      autoPlay={false}
    >
      <CarouselIndicators
        activeIndex={activeIndex}
        items={data.map((item, index) => {
          const { id, url, nome } = item;
          const key = `${id}-${index}`;
          const src = `${url}${nome}`;
          return { key, src };
        })}
        onClickHandler={(newIndex) => {
          setActiveIndex(newIndex);
        }} />
      {data.map((item, index) => {
        const { id, url, nome } = item;
        const alt_slide = `Slide-${id}-${index}`;
        const image_alt = `Imagem-${id}-${index}`;
        const image_url = `${url}${nome}`;
        const image_height = '300px';

        return (
          <CarouselItem key={index}>
            <CarouselItemImg
              alt={alt_slide}
              src={image_url}
              onClick={() => {
                const data_modal = { image_url, image_alt, image_height };
                ModalImagem(data_modal);
              }}
            />
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
