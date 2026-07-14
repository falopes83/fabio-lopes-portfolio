import { useMemo } from 'react';

type HeroProjectGalleryProps = {
  projects: Array<{
    title: string;
    image: string;
  }>;
  imageAlt: string;
  progress: number;
  isMobile?: boolean;
};

function chunkProjects(projects: HeroProjectGalleryProps['projects']) {
  const repeated = [...projects, ...projects];

  return [
    repeated.filter((_, index) => index % 3 === 0),
    repeated.filter((_, index) => index % 3 === 1),
    repeated.filter((_, index) => index % 3 === 2),
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HeroProjectGallery({ projects, imageAlt, progress, isMobile = false }: HeroProjectGalleryProps) {
  const columns = useMemo(() => chunkProjects(projects), [projects]);
  const reveal = clamp(progress / (isMobile ? 0.76 : 0.62), 0, 1);
  const flatten = clamp((progress - (isMobile ? 0.16 : 0.24)) / (isMobile ? 0.68 : 0.56), 0, 1);
  const introLift = isMobile ? 0 : 30 * (1 - clamp(progress / 0.18, 0, 1));
  const rotateX = (isMobile ? 58 : 62) - flatten * (isMobile ? 58 : 62);
  const translateY = isMobile ? 40 - reveal * 30 : 24 + introLift - reveal * 40;
  const scale = isMobile ? 0.9 + flatten * 0.14 : 0.9 + flatten * 0.18;
  const width = isMobile ? 154 + flatten * 18 : 90 + flatten * 30;
  const tintOpacity = 0.58 - flatten * 0.18;

  return (
    <div
      className="absolute inset-0 min-h-[560px] overflow-hidden md:min-h-screen"
      aria-label={imageAlt}
      style={{
        perspective: '980px',
        perspectiveOrigin: '50% 10%',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="hero-project-gallery absolute left-1/2 top-0 grid -translate-x-1/2 grid-cols-3 gap-1.5 px-1.5 sm:gap-2 sm:px-2 md:gap-2.5 md:px-2.5"
        style={{
          width: `${width}vw`,
          transform: `translate3d(-50%, ${translateY}vh, 0) rotateX(${rotateX}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-2 sm:gap-3"
            style={{
              transform: `translate3d(0, ${
                progress * (columnIndex === 1 ? (isMobile ? -70 : -220) : isMobile ? 52 : 150)
              }px, ${columnIndex === 1 ? 34 : 0}px)`,
            }}
          >
            {column.map((project, imageIndex) => (
              <figure
                key={`${project.title}-${columnIndex}-${imageIndex}`}
                className="group relative aspect-[7/4] overflow-hidden rounded-md bg-white shadow-card ring-[3px] ring-white md:ring-[5px]"
              >
                <img
                  src={project.image}
                  alt={`Projeto ${project.title}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  style={{
                    filter: `saturate(${0.58 + flatten * 0.16}) contrast(${0.84 + flatten * 0.08}) brightness(${
                      1.16 - flatten * 0.08
                    })`,
                  }}
                  loading={imageIndex > 1 ? 'lazy' : 'eager'}
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(231,240,251,0.82)_0%,rgba(255,255,255,0.48)_44%,rgba(70,177,153,0.28)_100%)] mix-blend-screen"
                  style={{ opacity: tintOpacity }}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
