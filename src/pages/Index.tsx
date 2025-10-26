import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import { RadioPlayer } from '@/components/RadioPlayer';
import { Link } from 'react-router-dom';

const Index = () => {
  const currentShow = {
    title: 'Вечерний эфир',
    host: 'Александра Иванова',
    time: '18:00 - 21:00'
  };

  const upcomingShows = [
    {
      time: '21:00',
      title: 'Ночная волна',
      host: 'Елена Морозова',
      description: 'Расслабляющая музыка для поздного вечера'
    },
    {
      time: '00:00',
      title: 'Ночной микс',
      host: 'Автоэфир',
      description: 'Лучшие хиты в автоматическом режиме'
    }
  ];

  const popularShows = [
    { title: 'Утреннее шоу', host: 'Максим Петров', listeners: 3200 },
    { title: 'Драйв', host: 'Дмитрий Козлов', listeners: 2800 },
    { title: 'День начинается', host: 'Ольга Смирнова', listeners: 2400 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="text-center space-y-6 py-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
              <span className="text-sm font-semibold">В ПРЯМОМ ЭФИРЕ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {currentShow.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Слушайте лучшее радио онлайн. Качественный звук и любимые ведущие.
            </p>

            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Mic" size={18} />
                <span>{currentShow.host}</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                <span>{currentShow.time}</span>
              </div>
            </div>

            <Link to="/live">
              <Button size="lg" className="mt-4">
                <Icon name="Play" size={20} className="mr-2" />
                Слушать сейчас
              </Button>
            </Link>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Скоро в эфире</h2>
              <Link to="/live">
                <Button variant="ghost" className="gap-2">
                  Полное расписание
                  <Icon name="ArrowRight" size={18} />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingShows.map((show, index) => (
                <Card key={index} className="p-6 hover:bg-muted/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-center min-w-[60px]">
                      <div className="text-3xl font-bold text-primary">{show.time}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{show.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{show.host}</p>
                      <p className="text-sm text-muted-foreground">{show.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold mb-6">Популярные программы</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {popularShows.map((show, index) => (
                <Card key={index} className="p-6 hover:scale-105 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{show.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{show.host}</p>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="w-full justify-center">
                    <Icon name="Users" size={14} className="mr-1" />
                    {show.listeners.toLocaleString()} слушателей
                  </Badge>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Icon name="Radio" size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Качественный звук 24/7</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Наслаждайтесь кристально чистым звуком в любое время суток. 
              Профессиональные ведущие и тщательно подобранная музыка.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={18} className="text-primary" />
                <span>HD качество</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={18} className="text-primary" />
                <span>Онлайн-трансляция</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={18} className="text-primary" />
                <span>Без рекламы</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <RadioPlayer
        currentShow={currentShow.title}
        currentHost={currentShow.host}
        isLive={false}
      />
    </div>
  );
};

export default Index;