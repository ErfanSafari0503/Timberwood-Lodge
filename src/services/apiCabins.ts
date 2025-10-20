import supabase from "./supabase";
import type { Database } from "../types/supabaseTypes";

type cabinType = Database["public"]["Tables"]["cabins"]["Row"];

export async function getCabins(): Promise<cabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data as cabinType[];
}

interface newCabinType {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}

export async function createCabin(newCabin: newCabinType) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created!");
  }

  return data as cabinType[];
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted!");
  }
}
