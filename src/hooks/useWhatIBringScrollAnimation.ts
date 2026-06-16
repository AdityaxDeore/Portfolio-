import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

function getCardCenterOffset(card: HTMLElement) {
  return card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2
}

type CardElements = {
  card: HTMLElement
  inner: HTMLElement
  copy: HTMLElement | null
}

function collectCardElements(cards: HTMLElement[]): CardElements[] {
  return cards.map((card) => ({
    card,
    inner: card.querySelector<HTMLElement>('.what-i-bring__card-inner')!,
    copy: card.querySelector<HTMLElement>('.what-i-bring__copy'),
  }))
}

function updateCardFocus(items: CardElements[], virtualIndex: number) {
  const activeIndex = Math.round(virtualIndex)

  items.forEach(({ card }, i) => {
    card.classList.toggle('is-active', i === activeIndex)
  })
}

export function useWhatIBringScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const pin = section.querySelector<HTMLElement>('.what-i-bring__scroller')
      const track = section.querySelector<HTMLElement>('.what-i-bring__track')
      const cards = gsap.utils.toArray<HTMLElement>('.what-i-bring__card', section)
      const counter = section.querySelector<HTMLElement>('.what-i-bring__counter-current')
      const bar = section.querySelector<HTMLElement>('.what-i-bring__bar-fill')

      const mm = gsap.matchMedia()

      const setCounter = (index: number) => {
        if (counter) {
          counter.textContent = String(index + 1).padStart(2, '0')
        }
      }

      const resetCards = (items: CardElements[]) => {
        items.forEach(({ card }, i) => {
          card.classList.toggle('is-active', i === 0)
        })
      }

      const getMaxTrackOffset = () => {
        const lastCard = cards[cards.length - 1]
        if (!lastCard) return 0
        return Math.max(getCardCenterOffset(lastCard), 0)
      }

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const items = collectCardElements(cards)
        if (track) gsap.set(track, { clearProps: 'transform' })
        resetCards(items)
        setCounter(0)
        if (bar) gsap.set(bar, { scaleX: 1 })
      })

      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        if (!pin || !track || cards.length === 0) return

        const items = collectCardElements(cards)
        resetCards(items)
        setCounter(0)
        gsap.set(track, { x: 0 })
        if (bar) gsap.set(bar, { scaleX: 0 })

        const cardCount = cards.length
        let lastIndex = 0

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.5 * Math.max(cardCount - 1, 1)}`,
            pin,
            scrub: 0.5,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const virtualIndex = self.progress * Math.max(cardCount - 1, 0)
              const activeIndex = Math.round(virtualIndex)

              updateCardFocus(items, virtualIndex)

              if (activeIndex !== lastIndex) {
                setCounter(activeIndex)
                lastIndex = activeIndex
              }

              if (bar) {
                bar.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        tl.to(track, {
          x: () => -getMaxTrackOffset(),
          ease: 'none',
          duration: 1,
        })

        updateCardFocus(items, 0)
      })

      mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const items = collectCardElements(cards)
        if (track) gsap.set(track, { clearProps: 'transform' })
        resetCards(items)
        setCounter(0)

        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          interval: 0.1,
          batchMax: 3,
          onEnter: (batch) => {
            batch.forEach((card) => {
              const inner = card.querySelector<HTMLElement>('.what-i-bring__card-inner')
              if (!inner) return
              gsap.fromTo(
                inner,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', overwrite: true },
              )
            })
          },
        })

        const updateActiveCard = () => {
          const focusY = window.innerHeight * 0.55
          let activeIndex = 0
          let closest = Number.POSITIVE_INFINITY

          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect()
            const center = rect.top + rect.height / 2
            const distance = Math.abs(center - focusY)
            if (distance < closest) {
              closest = distance
              activeIndex = index
            }
          })

          setCounter(activeIndex)
          cards.forEach((card, index) => {
            card.classList.toggle('is-active', index === activeIndex)
          })
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: updateActiveCard,
        })

        updateActiveCard()
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return sectionRef
}