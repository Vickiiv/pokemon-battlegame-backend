import { Schema, model, Document, Types } from "mongoose";

export interface IRoster extends Document {
  userId: Types.ObjectId;
  pokemonIds: number[];
}

const rosterSchema = new Schema<IRoster>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  pokemonIds: {
    type: [Number],
    default: [],
  },
});

export const Roster = model<IRoster>("Roster", rosterSchema);
