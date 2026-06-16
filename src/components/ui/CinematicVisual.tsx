import type { ValuePillar } from '@/data/value'
import './CinematicVisual.css'

type CinematicVisualProps = {
  visual: ValuePillar['visual']
  className?: string
}

export function CinematicVisual({ visual, className = '' }: CinematicVisualProps) {
  return (
    <div className={`cinematic-visual cinematic-visual--${visual} ${className}`.trim()} aria-hidden="true">
      <div className="cinematic-visual__grain" />
      <div className="cinematic-visual__vignette" />
      <div className="cinematic-visual__glow" />

      {visual === 'neural' && <NeuralScene />}
      {visual === 'stack' && <StackScene />}
      {visual === 'dataflow' && <DataflowScene />}
      {visual === 'agents' && <AgentsScene />}
      {visual === 'pipeline' && <PipelineScene />}
      {visual === 'tensor' && <TensorScene />}
    </div>
  )
}

function NeuralScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      <circle className="cinematic-visual__node" cx="68" cy="200" r="15" />
      <circle className="cinematic-visual__node" cx="200" cy="82" r="17" />
      <circle className="cinematic-visual__node" cx="200" cy="318" r="17" />
      <circle className="cinematic-visual__node" cx="332" cy="200" r="20" />
      <circle className="cinematic-visual__node cinematic-visual__node--dim" cx="134" cy="128" r="9" />
      <circle className="cinematic-visual__node cinematic-visual__node--dim" cx="134" cy="272" r="9" />
      <circle className="cinematic-visual__node cinematic-visual__node--dim" cx="266" cy="128" r="9" />
      <circle className="cinematic-visual__node cinematic-visual__node--dim" cx="266" cy="272" r="9" />
      <path className="cinematic-visual__edge" d="M82 188 L184 98" />
      <path className="cinematic-visual__edge" d="M82 212 L184 302" />
      <path className="cinematic-visual__edge" d="M216 98 L318 188" />
      <path className="cinematic-visual__edge" d="M216 302 L318 212" />
      <path className="cinematic-visual__edge" d="M146 134 L192 88" />
      <path className="cinematic-visual__edge" d="M146 266 L192 312" />
      <path className="cinematic-visual__edge" d="M208 88 L254 134" />
      <path className="cinematic-visual__edge" d="M208 312 L254 266" />
      <path className="cinematic-visual__edge cinematic-visual__edge--pulse" d="M84 200 L316 200" />
    </svg>
  )
}

function StackScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      <rect className="cinematic-visual__layer cinematic-visual__layer--back" x="52" y="62" width="296" height="206" rx="16" />
      <rect className="cinematic-visual__layer cinematic-visual__layer--mid" x="74" y="88" width="296" height="206" rx="16" />
      <rect className="cinematic-visual__layer cinematic-visual__layer--front" x="96" y="114" width="296" height="206" rx="16" />
      <rect className="cinematic-visual__ui-bar" x="128" y="142" width="136" height="11" rx="5" />
      <rect className="cinematic-visual__ui-block" x="128" y="168" width="232" height="64" rx="9" />
      <rect className="cinematic-visual__ui-block cinematic-visual__ui-block--sm" x="128" y="248" width="100" height="40" rx="7" />
      <rect className="cinematic-visual__ui-block cinematic-visual__ui-block--sm" x="248" y="248" width="100" height="40" rx="7" />
      <circle className="cinematic-visual__ui-dot" cx="312" cy="152" r="4" />
    </svg>
  )
}

function DataflowScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      <path
        className="cinematic-visual__chart-line"
        d="M28 282 C88 244, 122 162, 176 196 S266 108, 326 142 S372 78, 372 78"
      />
      <path
        className="cinematic-visual__chart-area"
        d="M28 282 C88 244, 122 162, 176 196 S266 108, 326 142 S372 78, 372 78 L372 338 L28 338 Z"
      />
      {[58, 122, 186, 250, 314].map((x, i) => (
        <rect
          key={x}
          className="cinematic-visual__bar"
          style={{ animationDelay: `${i * 0.12}s` }}
          x={x}
          y={228 - i * 17}
          width="34"
          height={88 + i * 17}
          rx="7"
        />
      ))}
    </svg>
  )
}

function AgentsScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      <circle className="cinematic-visual__agent-core" cx="200" cy="200" r="48" />
      <circle className="cinematic-visual__agent-orbit cinematic-visual__agent-orbit--1" cx="200" cy="200" r="96" />
      <circle className="cinematic-visual__agent-orbit cinematic-visual__agent-orbit--2" cx="200" cy="200" r="142" />
      <circle className="cinematic-visual__agent-sat" cx="200" cy="58" r="11" />
      <circle className="cinematic-visual__agent-sat" cx="342" cy="200" r="11" />
      <circle className="cinematic-visual__agent-sat" cx="200" cy="342" r="11" />
      <circle className="cinematic-visual__agent-sat" cx="58" cy="200" r="11" />
      <circle className="cinematic-visual__agent-sat cinematic-visual__agent-sat--small" cx="268" cy="118" r="6" />
      <circle className="cinematic-visual__agent-sat cinematic-visual__agent-sat--small" cx="132" cy="118" r="6" />
      <circle className="cinematic-visual__agent-sat cinematic-visual__agent-sat--small" cx="268" cy="282" r="6" />
      <circle className="cinematic-visual__agent-sat cinematic-visual__agent-sat--small" cx="132" cy="282" r="6" />
    </svg>
  )
}

function PipelineScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      <path className="cinematic-visual__pipe" d="M36 200 H364" />
      {[72, 148, 228, 304].map((x, i) => (
        <g key={x}>
          <rect className="cinematic-visual__pipe-node" x={x - 26} y="170" width="52" height="60" rx="13" />
          <circle
            className="cinematic-visual__pipe-dot"
            style={{ animationDelay: `${i * 0.28}s` }}
            cx={x}
            cy="200"
            r="7.5"
          />
        </g>
      ))}
    </svg>
  )
}

function TensorScene() {
  return (
    <svg className="cinematic-visual__svg" viewBox="0 0 400 400" fill="none">
      {Array.from({ length: 36 }, (_, i) => {
        const col = i % 6
        const row = Math.floor(i / 6)
        const heat = (col + row) % 4
        return (
          <rect
            key={i}
            className={`cinematic-visual__cell cinematic-visual__cell--${heat}`}
            x={72 + col * 43}
            y={72 + row * 43}
            width="34"
            height="34"
            rx="5"
          />
        )
      })}
    </svg>
  )
}