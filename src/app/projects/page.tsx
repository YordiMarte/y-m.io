import Image, { type ImageProps } from 'next/image'
import { LinkIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'
import logoBeam from '@/images/logos/beam-dark.png'
import logoV0 from '@/images/logos/v0.jpg'
import logoKy from '@/images/logos/Ky.jpg'
import logoKOVA from '@/images/logos/Kova.jpg'

interface Project {
  name: string
  description: string
  link: { href: string; label: string }
  logo?: ImageProps['src']
}

const projects: Array<Project> = [
  {
    name: 'Kivoff',
    description:
      'Kivoff is a software company that builds web applications, digital products and tools for businesses, leveraging AI to turn ideas into practical, scalable solutions.',
    link: {
      href: 'https://github.com/YordiMarte/Kivoff',
      label: 'Kivoff.app',
    },
    logo: logoBeam,
  },
  {
    name: 'v0',
    description:
      '?',
    link: {
      href: 'https://github.com/YordiMarte/v0',
      label: 'v0.app',
    },
    logo: logoV0,
  },
  {
    name: 'Ky',
    description:
      '?',
    link: {
      href: 'https://github.com/YordiMarte/Ky',
      label: 'Ky.app',
    },
    logo: logoKy,
  },
  {
    name: 'Kova',
    description:
      '?',
    link: {
      href: 'https://github.com/YordiMarte/Kova',
      label: 'Kova.app',
    },
    logo: logoKOVA,
  },
]

const heroTitle =
  "Side projects, work apps, and things I've shipped along the way."

export const metadata = createPageMetadata({
  title: 'Projects',
  description: "Apps, tools, and experiments I've built.",
  heroTitle,
})

export default function Projects() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro={
        <>
          A mix of open-source experiments and products I&apos;ve built at work,
          across a range of frameworks and languages. You can find even more on my{' '}
          <a
            href="https://www.github.com/YordiMarte"
            className="link-underline"
          >
            GitHub
          </a>
          .
        </>
      }
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li key={project.name}>
            <ContentCard className="h-full">
              <div className="relative z-20 flex size-12 items-center justify-center rounded-full bg-card text-sm font-semibold text-foreground shadow-md ring-1 shadow-foreground/5 ring-border dark:border dark:border-border dark:bg-muted dark:ring-0">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 rounded-full"
                    unoptimized
                  />
                ) : (
                  project.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <ContentCardTitle
                href={project.link.href}
                external
                className="mt-6"
              >
                {project.name}
              </ContentCardTitle>
              <ContentCardDescription>
                {project.description}
              </ContentCardDescription>
              <p className="relative z-20 mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition group-hover:text-accent">
                <LinkIcon className="size-4 flex-none" />
                <span className="line-clamp-1">{project.link.label}</span>
              </p>
            </ContentCard>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
