import { z } from "zod";

export const addPokemonSchema = z.object({
  pokemonId: z.number().int().min(1, "Pokemon-ID muss mindestens 1 sein."),
});

export type AddPokemonInput = z.infer<typeof addPokemonSchema>;
