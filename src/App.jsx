import { useState } from 'react'
import './App.css'

export default function App() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);

  const colors = [
    { name: "Light Teal", hex: "#018FE1" },
    { name: "Light Brown", hex: "#A1702F" },
    { name: "Orange", hex: "#E08409" },
    { name: "Dark Teal", hex: "#346B8B" },
    { name: "Dark Brown", hex: "#614E34" },
    { name: "Stone Blue", hex: "#263136" },
  ];

  const handleClick = (color) => {
    navigator.clipboard.writeText(color.hex).then(() => alert(`${color.name} hexcode has been copied to clipboard.`));
    setSelectedColor(color);
  }

  const handleMouseEnter = (hex) => {
    setSelectedColor({ hex: hex, name: null });
  }

  const handleMouseLeave = () => {
    setSelectedColor({ hex: null, name: null });
  }

  const handleFocus = (index) => {
    setFocusedIndex(index);
  }

  const handleBlur = () => {
    setFocusedIndex(null);
  }

  const handleKeyDown = (e, index) => {
    if (e.key == "Enter") {
      setSelectedColor(colors[index]);
      navigator.clipboard.writeText(colors[index].hex).then(() => alert(`${colors[index].name} hexcode has been copied to clipboard.`));
    }
  }

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <p>Click on a color to use it in your project!</p>
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className="color-code">{selectedColor.name || color.hex}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
