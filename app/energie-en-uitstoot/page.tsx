import type { Metadata } from "next";
import { TopicPage } from "../components/TopicPage";
import { getTopic } from "@/data/world-data";

export const metadata: Metadata = {
  title: "Energie & uitstoot",
  description:
    "Elektriciteitstoegang en mondiale koolstofstromen, uitgelegd zonder schijnprecisie.",
};

export default function EnergyEmissionsPage() {
  return <TopicPage topic={getTopic("energie-en-uitstoot")!} />;
}
