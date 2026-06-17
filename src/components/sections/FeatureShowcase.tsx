import { showcaseSections } from '@/data/showcase'
import { motion, useReducedMotion } from 'motion/react'
import { AmbientVideo } from '@/components/ui/AmbientVideo'
import './FeatureShowcase.css'

const HERO_VIDEO_SRC = '/videos/hero-ambient.mp4'

function ShowcaseSection({
  item,
  index,
}: {
  item: (typeof showcaseSections)[number]
  index: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article 
      className="showcase__section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <AmbientVideo src={HERO_VIDEO_SRC} className="section-ambient-bg" opacity={0.16} />
      <div className={`showcase__layout${item.reverse ? ' showcase__layout--reverse' : ''}`}>
        {/* Text side */}
        <div className="showcase__text">
          <motion.div
            className="showcase__text-inner"
            variants={{
              hidden: reducedMotion ? {} : { opacity: 0, y: 32 },
              visible: reducedMotion ? {} : { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <span className="showcase__label">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="showcase__title">{item.title}</h2>
            <p className="showcase__subtitle">{item.subtitle}</p>
            <p className="showcase__desc">{item.description}</p>
            <hr className="showcase__divider" />
          </motion.div>
        </div>

        {/* Image side */}
        <div className="showcase__image-wrap">
          <motion.div
            className="showcase__image-mask"
            variants={{
              hidden: reducedMotion ? {} : {
                clipPath: item.reverse
                  ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
                  : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
              },
              visible: reducedMotion ? {} : {
                clipPath: item.reverse
                  ? 'polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)'
                  : 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            <motion.img
              className="showcase__image"
              src={item.imageUrl}
              alt=""
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="showcase__image-overlay" />
          </motion.div>
        </div>

        {/* Section number watermark */}
        <motion.span
          className="showcase__number"
          aria-hidden="true"
          variants={{
            hidden: reducedMotion ? {} : { opacity: 0, x: item.reverse ? -40 : 40 },
            visible: reducedMotion ? {} : { opacity: 0.04, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>
    </motion.article>
  )
}

export function FeatureShowcase() {
  return (
    <section id="showcase" className="showcase" aria-label="Feature showcase">
      {showcaseSections.map((item, index) => (
        <ShowcaseSection
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </section>
  )
}
