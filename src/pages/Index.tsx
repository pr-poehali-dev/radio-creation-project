import { MyRadioPlayer } from '@/components/MyRadioPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <MyRadioPlayer 
          radioId="54137"
          player="energy"
          skin="blue"
          width={200}
          autoplay={1}
          volume={70}
        />
      </main>
    </div>
  );
};

export default Index;