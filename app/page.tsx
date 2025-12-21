import HomeContent from "./components/HomeContent";
import { fetchServiceAreas } from "@/lib/serviceAreas";

export default async function Home() {
  const { data: services } = await fetchServiceAreas();
  return <HomeContent serviceList={services} />;
}
