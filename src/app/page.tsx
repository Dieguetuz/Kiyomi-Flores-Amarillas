import { getRecipientConfig } from '@/config/recipients';
import { GardenExperience } from '@/components/GardenExperience';

export default function HomePage() {
  const config = getRecipientConfig('kiyomi');
  return <GardenExperience config={config} />;
}
