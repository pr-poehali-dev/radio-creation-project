export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
  coverImage?: string;
}

export const radioTracks: Track[] = [
  {
    id: '1',
    title: 'Три метра над уровнем неба',
    artist: 'Катя Денисова',
    duration: '3:45',
    url: 'https://cdns-preview-c.dzcdn.net/stream/c-c8e0e6e5e9e9e9e9e9e9e9e9e9e9e9e9-5.mp3'
  }
];

export const getCurrentTrack = (trackId: string): Track | undefined => {
  return radioTracks.find(track => track.id === trackId);
};

export const getRandomTrack = (): Track => {
  const randomIndex = Math.floor(Math.random() * radioTracks.length);
  return radioTracks[randomIndex];
};
