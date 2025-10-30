import { Navigation } from '@/components/Navigation';
import { MyRadioPlayer } from '@/components/MyRadioPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <MyRadioPlayer 
            radioId="54137"
            player="energy"
            skin="blue"
            width={200}
            autoplay={1}
            volume={70}
            showVisualizer={true}
            showLastSongs={true}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
