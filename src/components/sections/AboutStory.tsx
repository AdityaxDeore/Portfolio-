import {
  aboutBentoItems,
  stickyFeatureItems,
} from '@/data/aboutStory'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AboutStory.css'

function useActiveScrollIndex(itemCount: number) {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const ratiosRef = useRef<Map<number, number>>(new Map())

  const setItemRef = useCallback((index: number, el: HTMLElement | null) => {
    itemRefs.current[index] = el
  }, [])

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const pickActive = () => {
      let bestIndex = 0
      let bestRatio = 0

      ratiosRef.current.forEach((ratio, index) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestIndex = index
        }
      })

      if (bestRatio > 0) {
        setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex))
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.featureIndex)
          ratiosRef.current.set(index, entry.intersectionRatio)
        })
        pickActive()
      },
      {
        root: null,
        rootMargin: '-36% 0px -36% 0px',
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
      }
    )

    nodes.forEach((node, index) => {
      node.dataset.featureIndex = String(index)
      observer.observe(node)
    })

    return () => {
      observer.disconnect()
      ratiosRef.current.clear()
    }
  }, [itemCount])

  return { activeIndex, setItemRef }
}

export function AboutStory() {
  const { activeIndex: activeFeature, setItemRef } = useActiveScrollIndex(
    stickyFeatureItems.length
  )
  const activeVisual = stickyFeatureItems[activeFeature] ?? stickyFeatureItems[0]

  return (
    <section id="about-story" className="about-story" aria-label="Extended about">
      <div className="container about-story__bento-wrap">
        <header className="about-story__bento-header">
          <p className="about-story__label">01b — My Approach</p>
          <h3 className="about-story__bento-title">How I think &amp; build</h3>
          <p className="about-story__bento-subtitle">
            Four pillars that shape every project — from classroom prototypes to production deployments.
          </p>
        </header>

        <div className="about-story__bento">
          {aboutBentoItems.map((item) => (
            <article
              key={item.id}
              className={`about-story__bento-tile about-story__bento-tile--${item.id} about-story__bento-tile--${item.variant}${item.image ? '' : ' about-story__bento-tile--text-only'}`}
            >
              {item.image && (
                <div className="about-story__bento-media">
                  <img
                    className="about-story__bento-image"
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="about-story__bento-content">
                <span className="about-story__bento-index">{item.index}</span>
                <p className="about-story__bento-tag">{item.subtitle}</p>
                <h4 className="about-story__bento-card-title">{item.title}</h4>
                <p className="about-story__bento-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container about-story__sticky-wrap">
        <header className="about-story__sticky-header">
          <h3 className="about-story__sticky-title">Depth across the stack</h3>
          <p className="about-story__sticky-subtitle">
            Scroll to explore each layer — the visual stays pinned while details unfold.
          </p>
        </header>

        <div className="about-story__sticky-layout">
          <div className="about-story__sticky-visual" aria-live="polite" aria-atomic="true">
            <div className="about-story__sticky-visual-inner">
              {stickyFeatureItems.map((feature, index) => (
                <img
                  key={feature.id}
                  src={feature.image}
                  alt=""
                  className={`about-story__sticky-image${activeFeature === index ? ' about-story__sticky-image--active' : ''}`}
                />
              ))}
              <div className="about-story__sticky-visual-overlay">
                <div className="about-story__sticky-visual-copy" key={activeVisual.id}>
                  <span className="about-story__sticky-visual-tag">{activeVisual.tag}</span>
                  <strong className="about-story__sticky-visual-title">{activeVisual.title}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="about-story__sticky-features">
            {stickyFeatureItems.map((feature, index) => (
              <article
                key={feature.id}
                ref={(el) => setItemRef(index, el)}
                className={`about-story__feature${activeFeature === index ? ' about-story__feature--active' : ''}`}
              >
                <span className="about-story__feature-index">{String(index + 1).padStart(2, '0')}</span>
                <h4 className="about-story__feature-title">
                  <strong>{feature.title}</strong>
                </h4>
                <p className="about-story__feature-desc">{feature.description}</p>
                <Link to="/#projects" className="about-story__feature-link">
                  See related projects →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
