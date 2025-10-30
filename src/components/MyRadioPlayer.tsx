import { useEffect, useRef } from 'react';

interface MyRadioPlayerProps {
  radioId?: string;
  player?: 'default' | 'lite' | 'energy' | 'custom';
  skin?: 'blue' | 'red' | 'green' | 'black';
  width?: number;
  autoplay?: 0 | 1;
  volume?: number;
  showVisualizer?: boolean;
  showLastSongs?: boolean;
}

export const MyRadioPlayer = ({
  radioId = '54137',
  player = 'energy',
  skin = 'blue',
  width = 200,
  autoplay = 1,
  volume = 70,
  showVisualizer = true,
  showLastSongs = true
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
    <div ref={containerRef} className="my-radio-player-container space-y-6">
      <div 
        id="my_player" 
        className="my_player mx-auto" 
        data-player={player}
        data-skin={skin}
        data-width={width}
        data-autoplay={autoplay}
        data-volume={volume}
        data-streamurl={`https://myradio24.org/${radioId}`}
      />

      {showVisualizer && (
        <canvas 
          className="my_visualizer mx-auto" 
          width={320} 
          height={128}
          data-size={64}
          data-revert={0}
          data-color="rgb"
        />
      )}

      <div className="space-y-4 text-center">
        <div 
          data-myinfo="logo" 
          className="mx-auto bg-cover bg-center" 
          style={{ width: '300px', height: '80px' }}
        />
        
        <div 
          data-myinfo="img" 
          className="mx-auto bg-cover bg-center rounded-lg shadow-lg" 
          style={{ width: '300px', height: '300px' }}
        />

        <div className="text-xl font-bold" data-myinfo="song" />

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span>🎧</span>
          <b data-myinfo="listeners" />
          <span data-myinfo="isonline" />
          <span>-</span>
          <span data-myinfo="kbps" />
          <span>kbps</span>
          <a href={`https://myradio24.org/${radioId}.m3u`} target="_blank" rel="noopener noreferrer">
            <img src="https://myradio24.com/img/wmp.gif" alt="Windows Media Player" />
          </a>
          <a 
            href={`https://myradio24.com/ru/player/${radioId}`} 
            onClick={(e) => {
              e.preventDefault();
              window.open(e.currentTarget.href, 'player', 'width=300,height=30');
            }}
          >
            <img src="https://myradio24.com/img/open.gif" alt="Open Player" />
          </a>
        </div>

        <div className="font-semibold" data-myinfo="streamname" />
        <div data-myinfo="htmlavatar" />
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
          data-myinfo="url" 
          className="text-primary hover:underline"
        />
      </div>

      {showLastSongs && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center">Последние песни</h3>
          <div 
            className="my_lastsongs inline-block max-w-[500px] mx-auto w-full" 
            data-revert={1}
          >
            <div className="my_lastsonghtml hidden">
              <div className="flex gap-2 items-center text-left my-1 p-2 hover:bg-muted/50 rounded transition-colors">
                <img 
                  className="my_lastsong_cover w-11 h-11 rounded border" 
                  alt="Cover"
                />
                <span className="text-sm text-muted-foreground">%songtime%</span>
                <a 
                  href="https://www.youtube.com/results?search_query=%songencode%" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="text-primary hover:underline flex-1 min-w-0 truncate"
                >
                  %song%
                </a>
                <span 
                  className="vm_postLikes vm_likes vm_like_318761878_%songid%" 
                  data-likeid="318761878_%songid%"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRadioPlayer;
