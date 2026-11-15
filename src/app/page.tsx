import Desktop from '@/components/Desktop';
import { getPhotoSpots } from '@/lib/photos';

// Server component: the photo folders are read at build time and handed to the client desktop
export default function Home() {
  return <Desktop photoSpots={getPhotoSpots()} />;
}
