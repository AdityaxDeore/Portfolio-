import './ChatSuggestions.css'

type ChatSuggestionsProps = {
  items: readonly string[]
  onSelect: (text: string) => void
  disabled?: boolean
  label?: string
}

export function ChatSuggestions({
  items,
  onSelect,
  disabled = false,
  label = 'Quick questions',
}: ChatSuggestionsProps) {
  return (
    <div className="chat-suggestions">
      <p className="chat-suggestions__label">{label}</p>
      <div className="chat-suggestions__grid">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="chat-suggestions__chip"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(item)}
            disabled={disabled}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
