import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <ContentCard as="li">
      <ContentCardTitle as="h3" href={href} external={Boolean(href)}>
        <span className="inline-flex items-center gap-2">
          {title}
          {href ? (
            <ArrowUpRightIcon
              className="size-4 text-muted-foreground transition group-hover:text-accent"
              aria-hidden
            />
          ) : null}
        </span>
      </ContentCardTitle>
      <ContentCardDescription>{children}</ContentCardDescription>
    </ContentCard>
  )
}

const heroTitle =
  'What I use every day to build, create, and stay productive.'

export const metadata = createPageMetadata({
  title: 'Uses',
  description:
    'Gear and apps I use every day to build, create, and stay productive.',
  heroTitle,
})

export default function Uses() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro="Gear and apps I actually own and enjoy using. Mostly tech. Links are affiliate where available, which means I may earn a commission if you buy something, at no extra cost to you."
    >
      <div className="space-y-20">
        <ToolsSection title="Apps">
          <Tool
            title="Visual Studio Code"
            href="https://code.visualstudio.com/"
          >
            The best code editor for Full-stack development. I use it daily.
          </Tool>

          <Tool title="Cursor" href="https://www.cursor.com/">
            My primary IDE for software development and AI-assisted coding.
          </Tool>

          <Tool title="Warp" href="https://www.warp.dev/blog/warp-is-now-open-source/">
            Warp is a modern terminal for developers. I use it daily for my development work.
          </Tool>

          <Tool title="Figma" href="https://www.figma.com/">
            Where I explore interfaces and turn ideas into visual direction.
          </Tool>

          <Tool
            title="GitHub"
            href="https://www.github.com/"
          >
            GitHub is a web-based platform used for version control and collaborative software development. I use it daily for my development work.
          </Tool>
          <Tool title="Notion" href="https://www.notion.so/">
            Planning, notes, and systems.
          </Tool>
          <Tool title="Claude" href="https://www.claude.ai/">
            Claude is an AI assistant that helps me with coding, writing, and research.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
