import React, { useRef, useEffect, useState, type ReactNode, useCallback } from 'react';

type CarouselProps = {
  children: ReactNode;
  // Prop opcional para controlar a velocidade da rotação em milissegundos
  autoScrollInterval?: number;
};

export function Carousel({ children, autoScrollInterval = 3000 }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');
  const totalChildren = React.Children.count(children);

  useEffect(() => {
    if (isHovering || !carouselRef.current) {
      return;
    }

    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
        const gap = 150; 
        if (scrollDirection === 'forward') {
          // Se chegou ao final, inverte a direção
          if (scrollLeft + clientWidth + 100 >= scrollWidth) {
            setScrollDirection('backward');
          } else {
            carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
          }
        } else { // scrollDirection === 'backward'
          // Se chegou ao início, inverte a direção
          if (scrollLeft <= 0) {
            setScrollDirection('forward');
          } else {
            // Senão, continua rolando para trás
            carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
          }
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(intervalId);
  }, [isHovering, autoScrollInterval, children, scrollDirection]); // Adicionamos 'scrollDirection' às dependências

  // Função para atualizar o índice com base na posição da rolagem
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
    const gap = 100;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(newIndex);
  }, []);

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 snap-x snap-mandatory py-4 no-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
