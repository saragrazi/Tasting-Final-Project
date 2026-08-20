import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message, confirmLabel }) {
  const { isDark } = useTheme();
  const [isConfirming, setIsConfirming] = useState(false);
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: isDark ? '#2b2b2b' : '#fff', color: isDark ? '#f0f0f0' : '#000',
        padding: '24px', borderRadius: '8px',
        maxWidth: '400px', width: '100%', textAlign: 'center', direction: 'rtl'
      }}>
        <h3>{title || "אישור מחיקה"}</h3>
        <p>{message || "האם למחוק פריט זה?"}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={onClose}
            disabled={isConfirming}
            style={{
              padding: '8px 16px', borderRadius: '4px', cursor: isConfirming ? 'default' : 'pointer',
              backgroundColor: isDark ? '#444' : '#eee', color: isDark ? '#f0f0f0' : '#000', border: 'none',
              opacity: isConfirming ? 0.6 : 1,
            }}
          >
            ביטול
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            style={{
              padding: '8px 16px', borderRadius: '4px', backgroundColor: '#e53e3e', color: '#fff', border: 'none',
              cursor: isConfirming ? 'default' : 'pointer', opacity: isConfirming ? 0.7 : 1,
            }}
          >
            {isConfirming ? "מבצע..." : (confirmLabel || "מחיקה")}
          </button>
        </div>
      </div>
    </div>
  );
}