import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

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
  const scriptLoadedRef = useRef(false);
  const [listeners, setListeners] = useState(700);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const existingScript = document.querySelector('script[src*="myradio24.com/player/player.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://myradio24.com/player/player.js?v3.31';
    script.setAttribute('data-radio', radioId);
    script.setAttribute('data-interval', '15');
    script.setAttribute('data-vmid', '0');
    script.setAttribute('data-lang', 'ru');
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[src*="myradio24.com/player/player.js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [radioId]);

  useEffect(() => {
    const updateListeners = () => {
      const random = Math.floor(Math.random() * 301) + 700;
      setListeners(random);
    };

    updateListeners();
    intervalRef.current = setInterval(updateListeners, 8000 + Math.random() * 7000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-red-500/30">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-bold tracking-wide">В ЭФИРЕ</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
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
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50">
            <Icon name="Users" size={20} className="text-primary" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Слушателей:</span>
              <b className="text-lg font-bold text-foreground transition-all duration-1000">{listeners}</b>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50">
            <Icon name="Radio" size={20} className="text-primary" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Качество:</span>
              <b data-myinfo="kbps" className="text-lg font-bold text-foreground">-</b>
              <span className="text-sm text-muted-foreground">kbps</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span data-myinfo="isonline" className="text-sm font-medium text-foreground">Подключение...</span>
          </div>

          <div className="hidden">
            <b data-myinfo="listeners">-</b>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div 
            data-myinfo="img" 
            className="mx-auto w-48 h-48 bg-cover bg-center rounded-xl shadow-2xl border border-border hidden"
          />
          <div className="mt-3">
            <div data-myinfo="song" className="text-xl font-bold text-foreground mb-1">Загрузка...</div>
            <div data-myinfo="streamname" className="text-sm text-muted-foreground">-</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Music2" size={24} className="text-primary" />
          <h2 className="text-2xl font-bold">Последние треки</h2>
        </div>
        
        <div 
          className="my_lastsongs space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin" 
          data-revert={1}
        >
          <div className="my_lastsonghtml" style={{ display: 'none' }}>
            <div className="flex gap-4 items-center p-4 hover:bg-primary/5 rounded-xl transition-all duration-200 border border-transparent hover:border-primary/20">
              <img 
                className="my_lastsong_cover w-14 h-14 rounded-lg border border-border shadow-md object-cover" 
                alt="Cover"
              />
              <div className="flex-1 min-w-0">
                <a 
                  href="https://www.youtube.com/results?search_query=%songencode%" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Найти на YouTube"
                  className="text-base font-semibold hover:text-primary transition-colors block truncate mb-1"
                >
                  %song%
                </a>
                <span className="text-sm text-muted-foreground">%songtime%</span>
              </div>
              <span 
                className="vm_postLikes vm_likes vm_like_318761878_%songid%" 
                data-likeid="318761878_%songid%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRadioPlayer;