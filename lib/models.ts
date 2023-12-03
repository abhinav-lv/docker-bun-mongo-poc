import { Schema, model, InferSchemaType } from "mongoose";

const baseSchema = {
  required: true,
};

const sampleSchema = new Schema({
  title: {
    ...baseSchema,
    type: String,
  },
  desc: {
    ...baseSchema,
    type: String,
  },
  createAt: { ...baseSchema, type: Date },
  isProp: {
    ...baseSchema,
    type: Boolean,
  },
  count: {
    ...baseSchema,
    type: Number,
  },
});
export type SampleType = InferSchemaType<typeof sampleSchema>;
export const Sample = model<SampleType>("Sample", sampleSchema);
