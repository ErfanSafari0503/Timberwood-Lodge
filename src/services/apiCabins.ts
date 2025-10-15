import supabase from "./supabase";
import type { Database } from "../types/supabaseTypes";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return (data ?? []) as Cabin[];
}
