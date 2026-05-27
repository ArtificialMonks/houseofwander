import casaCabane from "../../source/stays/casa-cabane.json";
import casaFabiola from "../../source/stays/casa-fabiola.json";
import louiseMarie from "../../source/stays/louise-marie.json";
import type { StaySource } from "../components/stay-experience";

export const stays = [
  casaCabane,
  casaFabiola,
  louiseMarie
] as StaySource[];

export const staysBySlug = new Map(stays.map((stay) => [stay.slug, stay]));

export function getStayBySlug(slug: string) {
  return staysBySlug.get(slug);
}
