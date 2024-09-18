import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expenses"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Work",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Health",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Uncategorized",
      ],
      required: true,
    },
    color: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


export const Transaction = mongoose.model("Transaction", transactionSchema);
