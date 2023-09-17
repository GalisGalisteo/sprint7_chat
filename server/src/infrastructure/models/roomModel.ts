import { Schema } from "mongoose";
import { userSchema } from "./userModel";

export const roomSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    userCreator: {
      type: String,
      required: true
    },
    users: [userSchema]
  })