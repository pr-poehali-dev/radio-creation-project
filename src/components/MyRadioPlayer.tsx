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
    <div className="space-y-6 animate-fade-in">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-card to-secondary/10 border-2 border-primary/30 rounded-3xl p-8 shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(162,89,255,0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-primary via-primary/90 to-secondary text-white px-6 py-3 rounded-full shadow-xl shadow-primary/40 animate-scale-in">
              <div className="relative">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">В Эфире</span>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 shadow-xl">
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
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-primary/20">
            <div className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/10">
              <div className="p-2 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Слушателей:</span>
                <b className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-1000">{listeners}</b>
              </div>
            </div>

            <div className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 rounded-xl border border-secondary/30 transition-all duration-300 shadow-lg shadow-secondary/10">
              <div className="p-2 bg-secondary/20 rounded-lg group-hover:scale-110 transition-transform">
                <Icon name="Radio" size={20} className="text-secondary" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Качество:</span>
                <b data-myinfo="kbps" className="text-xl font-bold text-foreground">-</b>
                <span className="text-sm font-medium text-muted-foreground">kbps</span>
              </div>
            </div>

            <div className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10 rounded-xl border border-green-500/30 transition-all duration-300 shadow-lg shadow-green-500/10">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span data-myinfo="isonline" className="text-sm font-semibold text-foreground">Подключение...</span>
            </div>

            <div className="hidden">
              <b data-myinfo="listeners">-</b>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div 
              data-myinfo="img" 
              className="mx-auto w-56 h-56 bg-cover bg-center rounded-2xl shadow-2xl border-2 border-primary/30 hidden"
            />
            <div className="mt-4 space-y-2">
              <div data-myinfo="song" className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2">Загрузка...</div>
              <div data-myinfo="streamname" className="text-sm text-muted-foreground font-medium">-</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-card via-primary/5 to-card border-2 border-primary/20 rounded-3xl p-8 shadow-xl shadow-primary/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
              <Icon name="Music2" size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Последние треки</h2>
          </div>
          
          <div 
            className="my_lastsongs space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin" 
            data-revert={1}
          >
            <div className="my_lastsonghtml" style={{ display: 'none' }}>
              <div className="group flex gap-4 items-center p-4 bg-gradient-to-br from-card/50 to-primary/5 hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300 border border-primary/20 hover:border-primary/40 shadow-md hover:shadow-lg hover:shadow-primary/20">
                <img 
                  className="my_lastsong_cover w-16 h-16 rounded-xl border-2 border-primary/30 shadow-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                  alt="Cover"
                />
                <div className="flex-1 min-w-0">
                  <a 
                    href="https://www.youtube.com/results?search_query=%songencode%" 
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Найти на YouTube"
                    className="text-base font-semibold text-foreground hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-all duration-300 block truncate mb-1.5"
                  >
                    %song%
                  </a>
                  <span className="text-sm text-muted-foreground font-medium">%songtime%</span>
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
    </div>
  );
};

export default MyRadioPlayer;