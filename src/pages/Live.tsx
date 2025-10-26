import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import { RadioPlayer } from '@/components/RadioPlayer';

const Live = () => {
  const currentShow = {
    title: 'Вечерний эфир',
    host: 'Александра Иванова',
    startTime: '18:00',
    endTime: '21:00',
    description: 'Лучшая музыка и горячие новости вечера',
    listeners: 1247
  };

  const schedule = [
    { time: '06:00 - 09:00', title: 'Утреннее шоу', host: 'Максим Петров', status: 'completed' },
    { time: '09:00 - 12:00', title: 'День начинается', host: 'Ольга Смирнова', status: 'completed' },
    { time: '12:00 - 15:00', title: 'Обеденный час', host: 'Игорь Волков', status: 'completed' },
    { time: '15:00 - 18:00', title: 'Драйв', host: 'Дмитрий Козлов', status: 'completed' },
    { time: '18:00 - 21:00', title: 'Вечерний эфир', host: 'Александра Иванова', status: 'live' },
    { time: '21:00 - 00:00', title: 'Ночная волна', host: 'Елена Морозова', status: 'upcoming' },
    { time: '00:00 - 06:00', title: 'Ночной микс', host: 'Автоэфир', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow" />
                  <span className="text-sm font-semibold">В ЭФИРЕ</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  <Icon name="Users" size={14} className="mr-1" />
                  {currentShow.listeners.toLocaleString()} слушателей
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{currentShow.title}</h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <Icon name="Mic" size={18} />
                  {currentShow.host}
                </p>
              </div>

              <p className="text-muted-foreground">{currentShow.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{currentShow.startTime} - {currentShow.endTime}</span>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Расписание эфира</h2>
            <div className="space-y-2">
              {schedule.map((item, index) => (
                <Card 
                  key={index}
                  className={`p-4 transition-all ${
                    item.status === 'live' 
                      ? 'bg-primary/5 border-primary' 
                      : item.status === 'completed'
                      ? 'opacity-50'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-mono text-muted-foreground min-w-[140px]">
                          {item.time}
                        </span>
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.status === 'live' && (
                          <Badge className="bg-red-500">LIVE</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground ml-[152px]">{item.host}</p>
                    </div>
                    
                    <Icon 
                      name={
                        item.status === 'live' ? 'Radio' : 
                        item.status === 'completed' ? 'Check' : 
                        'Clock'
                      } 
                      size={20}
                      className={item.status === 'live' ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <RadioPlayer
        currentShow={currentShow.title}
        currentHost={currentShow.host}
        isLive={true}
      />
    </div>
  );
};

export default Live;
