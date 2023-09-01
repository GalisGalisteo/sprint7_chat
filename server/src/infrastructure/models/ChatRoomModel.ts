import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  }
})

const userSchema = new Schema({
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
    },
  },
  password: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
});

const RoomSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  users: [userSchema],
});

export const ChatRoomModel = mongoose.model("ChatRoom", RoomSchema)