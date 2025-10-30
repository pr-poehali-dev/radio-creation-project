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
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-red-500/30">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-bold tracking-wide">В ЭФИРЕ</span>
          </div>
        </div>

        <div className="flex justify-center">
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