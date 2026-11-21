import { redirect } from "next/navigation";

// `/view` e kono id na thakle details page nei — tai browse list e pathai
export default function ViewIndexPage() {
  redirect("/browsetuitions");
}
