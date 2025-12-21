import ServicesPageContent from "../components/ServicesPageContent";
import { fetchServiceAreas } from "@/lib/serviceAreas";

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();

  return <ServicesPageContent services={data} hasError={!!error} />;
}
