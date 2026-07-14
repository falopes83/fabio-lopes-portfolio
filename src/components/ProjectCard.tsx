import { ArrowUpRight } from 'lucide-react';
import { projectSlugs } from '../data/content';
import { useI18n } from '../i18n';
import { Button } from './Button';

type ProjectCardProps = {
  index: number;
  project: {
    title: string;
    tags: string[];
    description: string;
    image: string;
  };
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  const { t } = useI18n();
  const href = `/projetos/${projectSlugs[index]}`;

  return (
    <article className="group">
      <a href={href} className="relative block aspect-[7/4] overflow-hidden rounded-md">
        <img
          src={project.image}
          alt={`Thumbnail do projeto ${project.title}`}
          loading="lazy"
          className="h-[112%] w-full -translate-y-[5%] object-cover transition duration-500 group-hover:-translate-y-[8%] group-hover:scale-[1.035]"
        />
        <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--blue-padrao)] shadow-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[var(--tradewind-claro)]">
          <ArrowUpRight size={26} strokeWidth={2.6} />
        </span>
      </a>

      <div className="mt-5">
        <p className="inline-flex rounded-full bg-[var(--blue-escuro)] px-3 py-1 font-sans text-xs font-semibold leading-none text-white/62">
          {project.tags.join(' · ')}
        </p>
        <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[0.02em] text-white">{project.title}</h3>
        <p className="mt-4 min-h-[84px] font-sans text-base leading-6 tracking-[0.02em] text-white/78">{project.description}</p>
        <Button href={href} className="mt-6 min-h-12 px-4 py-3 text-sm">
          {t.actions.viewCreature}
        </Button>
      </div>
    </article>
  );
}
