import { useEffect, useRef } from 'react';

interface MyRadioPlayerProps {
  radioId?: string;
  player?: 'default' | 'lite' | 'energy' | 'custom';
  skin?: 'blue' | 'red' | 'green' | 'black';
  width?: number;
  autoplay?: 0 | 1;
  volume?: number;
}

export const MyRadioPlayer = ({
  radioId = '54137',
  player = 'energy',
  skin = 'blue',
  width = 200,
  autoplay = 1,
  volume = 70
}: MyRadioPlayerProps) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.remove();
    }

    const script = document.createElement('script');
    script.src = `https://myradio24.com/player/player.js?v3.31`;
    script.setAttribute('data-radio', radioId);
    script.setAttribute('data-interval', '15');
    script.setAttribute('data-vmid', '0');
    script.setAttribute('data-lang', 'ru');
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [radioId]);

  return (
    <div ref={containerRef}>
      <div 
        id="my_player" 
        className="my_player" 
        data-player={player}
        data-skin={skin}
        data-width={width}
        data-autoplay={autoplay}
        data-volume={volume}
        data-streamurl={`https://myradio24.org/${radioId}`}
      />

      <br /><br />

      <b>Последние песни</b><br /><br />
      <div 
        className="my_lastsongs" 
        data-revert={1}
        style={{ display: 'inline-block', maxWidth: '500px' }}
      >
        <div className="my_lastsonghtml" style={{ display: 'none' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', textAlign: 'left', margin: '3px' }}>
            <img 
              className="my_lastsong_cover" 
              style={{ width: '45px', height: '45px', borderRadius: '4px', verticalAlign: 'middle' }}
              alt="Cover"
            />
            <span>%songtime%</span>
            <a href="https://www.youtube.com/results?search_query=%songencode%" target="_blank" rel="noopener noreferrer" title="YouTube">
              %song%
            </a>
            <span className="vm_postLikes vm_likes vm_like_318761878_%songid%" data-likeid="318761878_%songid%" />
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default MyRadioPlayer;