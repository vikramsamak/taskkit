import { TODOS_DEFAULT_STATUS, TODOS_STATUS } from "@/helpers/Constants";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: TODOS_STATUS,
      default: TODOS_DEFAULT_STATUS,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Todos = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todos;
