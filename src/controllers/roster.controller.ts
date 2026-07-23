import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { Roster } from "../models/roster.model.ts";
import { addPokemonSchema } from "../schemas/roster.schema.ts";
import { z } from "zod";

// get
export const getRoster = async (req: AuthRequest, res: Response) => {
  let roster = await Roster.findOne({ userId: req.userId });

  if (!roster) {
    roster = await Roster.create({ userId: req.userId, pokemonIds: [] });
  }

  res.status(200).json(roster);
};

// add
export const addPokemon = async (req: AuthRequest, res: Response) => {
  const result = addPokemonSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: z.flattenError(result.error).fieldErrors });
  }

  const { pokemonId } = result.data;

  let roster = await Roster.findOne({ userId: req.userId });

  if (!roster) {
    roster = await Roster.create({
      userId: req.userId,
      pokemonIds: [pokemonId],
    });
    return res.status(201).json(roster);
  }

  if (roster.pokemonIds.includes(pokemonId)) {
    return res.status(409).json({ message: "Pokemon ist bereits im Roster." });
  }

  roster.pokemonIds.push(pokemonId);
  await roster.save();

  res.status(200).json(roster);
};

// delete
export const removePokemon = async (req: AuthRequest, res: Response) => {
  const pokemonId = Number(req.params.pokemonId);

  if (isNaN(pokemonId)) {
    return res.status(400).json({ message: "Ungültige Pokemon-ID" });
  }

  const roster = await Roster.findOne({ userId: req.userId });

  if (!roster) {
    return res.status(404).json({ message: "Kein Roster gefunden." });
  }

  roster.pokemonIds = roster.pokemonIds.filter((id) => id !== pokemonId);
  await roster.save();

  res.status(200).json(roster);
};
