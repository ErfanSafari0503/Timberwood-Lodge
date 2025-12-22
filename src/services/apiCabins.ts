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
  image: File;
}

export async function createCabin(newCabin: newCabinType) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{...newCabin, image: imagePath}])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created!");
  }

  if (!data || data.length === 0) {
    throw new Error("Cabin creation failed: no data returned");
  }

  const createdCabin = data[0] as cabinType;

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if(storageError) {
    await supabase.from("cabins").delete().eq("id", createdCabin.id);
    
    console.error(storageError);
    throw new Error("Image could not be uploaded and the cabin was not created!");
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
