import { Schema } from "mongoose";

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  }
})

export const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: function (value: string) {
      const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  password: {
    type: String,
    required: true
  },
  messages: [messageSchema]
})