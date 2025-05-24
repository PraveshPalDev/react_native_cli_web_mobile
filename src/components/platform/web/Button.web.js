import React, {useState} from 'react';

export default function Button({onPress, title}) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    backgroundColor: '#1E90FF',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(30, 144, 255, 0.4)',
    cursor: 'pointer',
    userSelect: 'none',
    transition:
      'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 0.3s ease, background-color 0.3s ease',
    transformOrigin: 'center',
  };

  const hoverStyle = {
    backgroundColor: '#1C86EE',
    boxShadow: '0 8px 16px rgba(28, 134, 238, 0.7)',
    transform: 'scale(1.1)',
  };

  const style = hovered ? {...baseStyle, ...hoverStyle} : baseStyle;

  return (
    <button
      onClick={onPress}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {title} (Web)
    </button>
  );
}
