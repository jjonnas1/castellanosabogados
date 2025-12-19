import { redirect } from "next/navigation";

export default function LegacyRegistroRedirect() {
  redirect("/auth/registro");
}
