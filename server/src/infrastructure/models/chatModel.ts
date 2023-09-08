import { Schema } from "mongoose";

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  sentDate: {
    type: Date,
    required: true
  },
  userName: {
    type: String,
    required: true
  }

})

export const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
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