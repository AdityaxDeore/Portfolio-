import { CinematicVisual } from '@/components/ui/CinematicVisual'
import { CurvedLoop } from '@/components/ui/CurvedLoop'
import { Sparkles } from '@/components/ui/Sparkles'
import { valueMarqueeText, valuePillars, valueSection } from '@/data/value'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useInView } from '@/hooks/useInView'
import { useWhatIBringScrollAnimation } from '@/hooks/useWhatIBringScrollAnimation'
import { useTheme } from '@/providers/ThemeProvider'
import { useReducedMotion } from 'motion/react'
import './WhatIBring.css'

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
  const sectionRef = useWhatIBringScrollAnimation()
  const [sparklesRef, sparklesInView] = useInView<HTMLDivElement>({ rootMargin: '120px 0px' })
  const [curveRef, curveInView] = useInView<HTMLDivElement>({ rootMargin: '80px 0px' })
  const { theme } = useTheme()
  const breakpoint = useBreakpoint()
  const reducedMotion = useReducedMotion()
  const sparkleColor = theme === 'dark' ? '#d4896e' : '#cc785c'
  const curve = getCurveSettings(breakpoint)
  const total = String(valuePillars.length).padStart(2, '0')
  const isMobile = breakpoint === 'mobile-sm' || breakpoint === 'mobile'
  const showSparkles = sparklesInView && !isMobile && !reducedMotion

  return (
    <section
      id="expertise"
      className="what-i-bring"
      ref={sectionRef}
      aria-labelledby="what-i-bring-title"
    >
      <div ref={sparklesRef} className="what-i-bring__canvas" aria-hidden="true">
        {showSparkles ? (
          <Sparkles
            className="what-i-bring__sparkles"
            color={sparkleColor}
            density={100}
            speed={0.72}
            size={1.1}
            opacity={0.42}
            opacitySpeed={0}
            minOpacity={0.06}
          />
        ) : null}
      </div>

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
            {valuePillars.map((pillar, index) => (
              <article
                key={pillar.id}
                className="what-i-bring__card"
                aria-label={`${pillar.label}, ${index + 1} of ${valuePillars.length}`}
              >
                <div className="what-i-bring__card-inner">
                  <div className="what-i-bring__visual-shell">
                    <span className="what-i-bring__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <CinematicVisual
                      visual={pillar.visual}
                      className="what-i-bring__visual"
                    />
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

        <div className="container what-i-bring__rail" aria-hidden="true">
          <div className="what-i-bring__bar">
            <div className="what-i-bring__bar-fill" />
          </div>
          <p className="what-i-bring__counter">
            <span className="what-i-bring__counter-current">01</span>
            <span className="what-i-bring__counter-sep">/</span>
            <span className="what-i-bring__counter-total">{total}</span>
          </p>
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