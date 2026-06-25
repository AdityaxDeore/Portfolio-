import { CurvedLoop } from '@/components/ui/CurvedLoop'
import { valueMarqueeText, valuePillars, valueSection } from '@/data/value'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from 'motion/react'
import './WhatIBring.css'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'dotlottie-player': any;
      }
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': any;
    }
  }
}

function getCurveSettings(breakpoint: ReturnType<typeof useBreakpoint>) {
  switch (breakpoint) {
    case 'mobile-sm':
      return { fontSize: 22, height: 80, curveHeight: 16, speed: 1.05 }
    case 'mobile':
      return { fontSize: 26, height: 92, curveHeight: 18, speed: 1.12 }
    case 'tablet':
      return { fontSize: 32, height: 108, curveHeight: 24, speed: 1.18 }
    case 'wide':
      return { fontSize: 42, height: 128, curveHeight: 32, speed: 1.28 }
    default:
      return { fontSize: 36, height: 116, curveHeight: 28, speed: 1.22 }
  }
}

export function WhatIBring() {
  const [curveRef, curveInView] = useInView<HTMLDivElement>({ rootMargin: '80px 0px' })
  const breakpoint = useBreakpoint()
  const reducedMotion = useReducedMotion()
  const curve = getCurveSettings(breakpoint)

  return (
    <section
      id="expertise"
      className="what-i-bring"
      aria-labelledby="what-i-bring-title"
    >
      <div className="what-i-bring__scroller">
        <header className="container what-i-bring__header">
          <p className="what-i-bring__label">{valueSection.label}</p>
          <h2 id="what-i-bring-title" className="what-i-bring__title">
            {valueSection.title}
          </h2>
          <p className="what-i-bring__subtitle">{valueSection.subtitle}</p>
        </header>

        <div className="what-i-bring__stage">
          <div className="what-i-bring__track" aria-live="polite">
            {[...valuePillars, ...valuePillars].map((pillar, index) => (
              <article
                key={`${pillar.id}-${index}`}
                className="what-i-bring__card"
                aria-label={`${pillar.label}, ${index + 1} of ${valuePillars.length * 2}`}
              >
                <div className="what-i-bring__card-inner">
                  <div className="what-i-bring__visual-shell">
                    <span className="what-i-bring__index" aria-hidden="true">
                      {String((index % valuePillars.length) + 1).padStart(2, '0')}
                    </span>
                    {'lottieUrl' in pillar && pillar.lottieUrl ? (
                      <div className="what-i-bring__lottie-container">
                        <dotlottie-player
                          src={pillar.lottieUrl}
                          background="transparent"
                          speed="1"
                          loop
                          autoplay
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <img
                        src={pillar.image}
                        alt=""
                        className="what-i-bring__image"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="what-i-bring__copy">
                    <p className="what-i-bring__tag">{pillar.tag}</p>
                    <h3 className="what-i-bring__card-title">{pillar.label}</h3>
                    <p className="what-i-bring__card-desc">{pillar.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div ref={curveRef} className="what-i-bring__curve-wrap">
        <CurvedLoop
          text={valueMarqueeText}
          speed={curve.speed}
          curveHeight={curve.curveHeight}
          fontSize={curve.fontSize}
          height={curve.height}
          direction="left"
          interactive={!reducedMotion && curveInView}
          paused={!!reducedMotion || !curveInView}
          gap={0.65}
          className="what-i-bring__curve"
        />
      </div>

      <p className="sr-only">{valueMarqueeText.replace(/·/g, ',')}</p>
    </section>
  )
}