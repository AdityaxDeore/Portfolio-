import './FooterMarquee.css'

type FooterMarqueeProps = {
  text: string
  className?: string
}

export function FooterMarquee({ text, className = '' }: FooterMarqueeProps) {
  const items = Array.from({ length: 6 }, (_, index) => (
    <span key={index} className="footer-marquee__item">
      <span className="footer-marquee__text">{text}</span>
      <span className="footer-marquee__star" aria-hidden="true">
        ✦
      </span>
    </span>
  ))

  return (
    <div className={`footer-marquee ${className}`.trim()} aria-hidden="true">
      <div className="footer-marquee__track">
        <div className="footer-marquee__row">{items}</div>
        <div className="footer-marquee__row">{items}</div>
      </div>
    </div>
  )
}