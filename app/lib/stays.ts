import casaCabane from "../../source/stays/casa-cabane.json";
import casaFabiola from "../../source/stays/casa-fabiola.json";
import ghentGroupHouse from "../../source/stays/ghent-group-house.json";
import heritageCollection from "../../source/stays/heritage-collection.json";
import louiseMarie from "../../source/stays/louise-marie.json";
import loveNest from "../../source/stays/the-love-nest.json";
import thelmaLouise from "../../source/stays/thelma-louise.json";
import type { StaySource } from "../components/stay-experience";

export const stays = [
  casaCabane,
  casaFabiola,
  louiseMarie,
  thelmaLouise,
  heritageCollection,
  loveNest,
  ghentGroupHouse
] as StaySource[];

export const staysBySlug = new Map(stays.map((stay) => [stay.slug, stay]));

export function getStayBySlug(slug: string) {
  return staysBySlug.get(slug);
}
