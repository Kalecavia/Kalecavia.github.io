import type { Metadata } from "next";
import { TopicPage } from "../components/TopicPage";
import { getTopic } from "@/data/world-data";

export const metadata: Metadata = {
  title: "Voedsel & water",
  description:
    "Voedselproductie, wateronttrekking, schaarste en toegang als verbonden mondiale systemen.",
};

export default function FoodWaterPage() {
  return <TopicPage topic={getTopic("voedsel-en-water")!} />;
}
