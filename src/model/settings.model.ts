import mongoose, { Schema, model } from "mongoose";

export interface ISettings {
  ownerId: string;
  businessName: string;
  supportEmail: string;
  knowledge: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    ownerId: {
      type: String,
      required: true,
      unique:true
    },
    businessName: {
      type: String
    },
    supportEmail: {
      type: String
    },
    knowledge: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

export const Settings =
  mongoose.models.Settings || model<ISettings>("Settings", settingsSchema);
