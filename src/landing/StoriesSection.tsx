import { SectionHeading } from './SectionHeading.tsx'
import { StoryAvatar } from './StoryAvatar.tsx'

const stories = [
  {
    person: 'teacher' as const,
    title: 'The teacher',
    role: 'Coordinator · runs the pool',
    color: 'text-sunset',
    quote: '"As a teacher, I start a pool on my laptop, approve the lab PCs, and my class gets a smarter tutor than any single PC can run, with no internet."'
  },
  {
    person: 'student' as const,
    title: 'The student',
    role: 'User · no install',
    color: 'text-gold',
    quote: '"As a student, I open a page in my phone\'s browser and ask my question. No app to install and no data bundle used."'
  },
  {
    person: 'helper' as const,
    title: 'The helper',
    role: 'Lends a laptop · earns sats',
    color: 'text-rose',
    quote: '"As a helper, I join with the code, lend my laptop\'s spare memory, and earn sats for every answer my laptop helped make."'
  }
]

export function StoriesSection() {
  return (
    <section id="stories" aria-labelledby="stories-title" className="landing-section">
      <SectionHeading id="stories-title" icon="people" eyebrow="WHO IT'S FOR" title="Three people, one pool.">
        User stories for the people in a school pool.
      </SectionHeading>
      <div className="grid-auto">
        {stories.map((story) => (
          <article key={story.title} className="feature-card">
            <StoryAvatar person={story.person} label={`Illustration of ${story.title.toLowerCase()}`} />
            <div className="stack">
              <strong className="feature-title">{story.title}</strong>
              <span className={`small ${story.color}`}>{story.role}</span>
            </div>
            <p className="story-quote">{story.quote}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
