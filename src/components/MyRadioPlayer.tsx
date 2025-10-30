import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow" />
              <span className="text-sm font-semibold">В ЭФИРЕ</span>
            </div>
          </div>

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

          {showVisualizer && (
            <canvas 
              className="my_visualizer rounded-lg" 
              width={320} 
              height={128}
              data-size={64}
              data-revert={0}
              data-color="rgb"
            />
          )}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Icon name="Music" size={24} />
            <h3 className="text-xl font-bold">Сейчас играет</h3>
          </div>

          <div 
            data-myinfo="img" 
            className="w-full aspect-square bg-cover bg-center rounded-lg shadow-lg border border-border"
          />

          <div className="space-y-2">
            <div className="text-2xl font-bold" data-myinfo="song">Загрузка...</div>
            <div className="text-lg text-muted-foreground font-semibold" data-myinfo="streamname" />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="secondary" className="gap-2">
              <Icon name="Users" size={16} />
              <b data-myinfo="listeners">0</b> слушателей
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <Icon name="Radio" size={16} />
              <span data-myinfo="kbps">-</span> kbps
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <span data-myinfo="isonline">Подключение...</span>
            </Badge>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a href={`https://myradio24.org/${radioId}.m3u`} download>
                <Icon name="Download" size={16} className="mr-2" />
                Скачать поток
              </a>
            </Button>
          </div>
        </Card>

        {showLastSongs && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="ListMusic" size={24} />
              <h3 className="text-xl font-bold">Последние песни</h3>
            </div>

            <div 
              className="my_lastsongs space-y-2 max-h-[500px] overflow-y-auto pr-2" 
              data-revert={1}
            >
              <div className="my_lastsonghtml hidden">
                <div className="flex gap-3 items-center p-3 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border">
                  <img 
                    className="my_lastsong_cover w-12 h-12 rounded-md border border-border shadow-sm object-cover" 
                    alt="Cover"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <a 
                      href="https://www.youtube.com/results?search_query=%songencode%" 
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Искать на YouTube"
                      className="text-sm font-semibold hover:text-primary transition-colors block truncate"
                    >
                      %song%
                    </a>
                    <span className="text-xs text-muted-foreground">%songtime%</span>
                  </div>
                  <span 
                    className="vm_postLikes vm_likes vm_like_318761878_%songid%" 
                    data-likeid="318761878_%songid%"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div 
        data-myinfo="logo" 
        className="mx-auto bg-cover bg-center rounded-lg hidden" 
        style={{ width: '300px', height: '80px' }}
      />
      <div data-myinfo="htmlavatar" className="hidden" />
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        data-myinfo="url" 
        className="hidden"
      />
    </div>
  );
};

export default MyRadioPlayer;
