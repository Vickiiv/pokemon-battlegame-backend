import { Schema, model, Document, Types } from "mongoose";

export interface IScore extends Document {
  userId: Types.ObjectId;
  score: number;
  date: Date;
}

const scoreSchema = new Schema<IScore>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Score = model<IScore>("Score", scoreSchema);
