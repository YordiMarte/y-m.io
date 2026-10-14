import { Suspense } from 'react'

import { PostsList } from '@/components/PostsList'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'

const heroTitle = 'Writing on coding, productivity, and life updates.'

export const metadata = createPageMetadata({
  title: 'Posts',
  description:
    '',
  heroTitle,
})

export default async function Posts() {
  let posts = await getAllPosts()

  return (
    <SimpleLayout
      title={heroTitle}
      intro="A collection of my latest GitHub repositories, projects I'm building, and experiments with new technologies. A place to explore what I'm working on and what I've been learning. Stay tuned for more!"
    >
      <Suspense fallback={null}>
        <PostsList posts={posts} />
      </Suspense>
    </SimpleLayout>
  )
}
