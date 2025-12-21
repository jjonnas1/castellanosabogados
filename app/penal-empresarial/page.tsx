import BusinessPageContent from "../components/BusinessPageContent";
import { fetchServiceAreas } from "@/lib/serviceAreas";

export default async function PenalEmpresarialPage() {
  const { data, error } = await fetchServiceAreas();

  return <BusinessPageContent services={data} hasError={!!error} />;
}
