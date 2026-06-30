import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import type { ProjectDepthFeature } from '@/lib/projectApproach'
import './ProjectDepthScroll.css'

function useActiveScrollIndex(itemCount: number, enabled: boolean) {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const ratiosRef = useRef<Map<number, number>>(new Map())

  const setItemRef = useCallback((index: number, el: HTMLElement | null) => {
    itemRefs.current[index] = el
  }, [])

  useEffect(() => {
    if (!enabled) return

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
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
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
  }, [itemCount, enabled])

  return { activeIndex, setActiveIndex, setItemRef }
}

type ProjectDepthScrollProps = {
  features: ProjectDepthFeature[]
  projectTitle: string
}

export function ProjectDepthScroll({ features, projectTitle }: ProjectDepthScrollProps) {
  const isMobile = useIsMobile()
  const { activeIndex, setActiveIndex, setItemRef } = useActiveScrollIndex(
    features.length,
    !isMobile
  )
  const activeFeature = features[activeIndex] ?? features[0]

  if (!features.length) return null

  if (isMobile) {
    return (
      <section id="depth" className="project-depth project-depth--mobile doc-section" aria-labelledby="project-depth-title">
        <header className="project-depth__header">
          <p className="project-depth__label">Engineering depth</p>
          <h2 id="project-depth-title" className="project-depth__title">
            Depth across the build
          </h2>
        </header>

        <div className="project-depth__mobile-visual" key={activeFeature.id}>
          <img src={activeFeature.image} alt="" className="project-depth__mobile-image" />
          <div className="project-depth__mobile-overlay">
            <span className="project-depth__visual-tag">{activeFeature.tag}</span>
            <strong className="project-depth__visual-title">{activeFeature.title}</strong>
          </div>
        </div>

        <div className="project-depth__mobile-tabs" role="tablist" aria-label="Build layers">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`project-depth__mobile-tab${activeIndex === index ? ' project-depth__mobile-tab--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <article className="project-depth__mobile-panel" key={`panel-${activeFeature.id}`}>
          <p className="project-depth__mobile-desc">{activeFeature.description}</p>
        </article>
      </section>
    )
  }

  return (
    <section id="depth" className="project-depth doc-section" aria-labelledby="project-depth-title">
      <header className="project-depth__header">
        <p className="project-depth__label">Engineering depth</p>
        <h2 id="project-depth-title" className="project-depth__title">
          Depth across the build
        </h2>
        <p className="project-depth__subtitle">
          Scroll through each layer of <strong>{projectTitle}</strong> — the visual stays pinned while
          details unfold.
        </p>
      </header>

      <div className="project-depth__layout">
        <div className="project-depth__visual" aria-live="polite" aria-atomic="true">
          <div className="project-depth__visual-inner">
            {features.map((feature, index) => (
              <img
                key={feature.id}
                src={feature.image}
                alt=""
                className={`project-depth__image${activeIndex === index ? ' project-depth__image--active' : ''}`}
              />
            ))}
            <div className="project-depth__visual-overlay">
              <div className="project-depth__visual-copy" key={activeFeature.id}>
                <span className="project-depth__visual-tag">{activeFeature.tag}</span>
                <strong className="project-depth__visual-title">{activeFeature.title}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="project-depth__features">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              ref={(el) => setItemRef(index, el)}
              className={`project-depth__feature${activeIndex === index ? ' project-depth__feature--active' : ''}`}
            >
              <span className="project-depth__feature-index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="project-depth__feature-title">
                <strong>{feature.title}</strong>
              </h3>
              <p className="project-depth__feature-desc">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
