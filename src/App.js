
import { useState } from 'react';
import { supabase } from './supabase';
import './App.css';

function App() {
  const [answer, setAnswer] = useState(null);
  const [noClicks, setNoClicks] = useState(0);
  const [saving, setSaving] = useState(false);
  const [noPosition, setNoPosition] = useState(null);

  const saveAnswer = async (value) => {
    if (saving) return;

    setSaving(true);

    const { error } = await supabase.from('responses').insert({
      answer: value,
    });

    if (error) {
      console.error('Failed to save response:', error);
    }

    setAnswer(value);
    setSaving(false);
  };

  const moveNoButton = () => {
    setNoClicks((current) => current + 1);

    const container = document.querySelector('.buttons');

    if (!container) return;

    const buttonWidth = 118;
    const buttonHeight = 50;
    const padding = 8;

    const maxX = container.clientWidth - buttonWidth - padding;
    const maxY = container.clientHeight - buttonHeight - padding;

    const x =
      padding + Math.random() * Math.max(0, maxX - padding);

    const y =
      padding + Math.random() * Math.max(0, maxY - padding);

    setNoPosition({
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  if (answer === 'yes') {
    return (
      <main className="page">
        <div className="card success-card">
          <div className="emoji">🎉</div>

          <h1>Yesss! ❤️</h1>

          <p className="subtitle">
            Looks like we met 😌
          </p>

          <div className="salute">🫡</div>

          <h2>Salute.</h2>

          <p className="description">
            Now we officially have to talk 😂
          </p>

          <div className="heart">❤️</div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="card">
        <div className="emoji">👀</div>

        <h1>Let's Get to Know Each Other</h1>

        <p className="subtitle">
          Give me a chance? 😌
        </p>

        <div className="buttons">
          <button
            className="yes-button"
            onClick={() => saveAnswer('yes')}
            disabled={saving}
          >
            {saving ? 'One second...' : '❤️ YES'}
          </button>

          <button
            className="no-button"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            style={
              noPosition
                ? {
                    position: 'absolute',
                    left: noPosition.left,
                    top: noPosition.top,
                    zIndex: 10,
                  }
                : undefined
            }
          >
            NO 😅
          </button>
        </div>

        {noClicks > 0 && (
          <div className="no-message">
            {noClicks === 1 && (
              <>
                <span>🤨</span>
                <p>Are you sure?</p>
              </>
            )}

            {noClicks === 2 && (
              <>
                <span>😂</span>
                <p>Think about it one more time...</p>
              </>
            )}

            {noClicks === 3 && (
              <>
                <span>🥲</span>
                <p>Okay... now I'm a little hurt.</p>
              </>
            )}

            {noClicks >= 4 && (
              <>
                <span>😭</span>
                <p>Think longer... 😭</p>
              </>
            )}
          </div>
        )}

        <div className="footer">
          Made with a little bit of courage 😌
        </div>
      </div>
    </main>
  );
}

export default App;
