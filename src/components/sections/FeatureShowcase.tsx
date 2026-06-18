import { showcaseSections } from '@/data/showcase'
import { motion, useReducedMotion } from 'motion/react'
import './FeatureShowcase.css'

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
      <div className={`showcase__layout${item.reverse ? ' showcase__layout--reverse' : ''}`}>
        {/* Text side */}
        <div className="showcase__text">
          <motion.div
            className="showcase__text-inner"
            variants={{
              hidden: reducedMotion ? {} : { opacity: 0, y: 32, filter: 'blur(8px)' },
              visible: reducedMotion ? {} : { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)',
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
              }
            }}
          >
            <div className="showcase__meta">
              <motion.span 
                className="showcase__number-label"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 0.1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } }
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
              <h2 className="showcase__title">{item.title}</h2>
            </div>
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
                opacity: 0,
                y: 60,
                scale: 0.95
              },
              visible: reducedMotion ? {} : {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
              }
            }}
          >
            <motion.img
              className="showcase__image"
              src={item.imageUrl}
              alt=""
              variants={{
                hidden: { scale: 1.2, opacity: 0.8 },
                visible: { scale: 1, opacity: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </motion.div>
        </div>
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
