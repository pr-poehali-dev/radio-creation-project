import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface RadioPlayerProps {
  streamUrl?: string;
  currentShow: string;
  currentHost: string;
  isLive: boolean;
}

export const RadioPlayer = ({ 
  streamUrl = '', 
  currentShow,
  currentHost,
  isLive 
}: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Playback error:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Radio" size={32} className="text-white" />
              </div>
              {isLive && (
                <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-slow" />
                  LIVE
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{currentShow}</h3>
              <p className="text-sm text-muted-foreground truncate">{currentHost}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 min-w-[200px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="shrink-0"
              >
                <Icon 
                  name={isMuted ? "VolumeX" : volume[0] > 50 ? "Volume2" : "Volume1"} 
                  size={20} 
                />
              </Button>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <Button
              size="icon"
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shrink-0"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
