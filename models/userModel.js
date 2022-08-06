const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    transactionIDs: {
      //id of every transaction in the team
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("newUsers", newUserSchema);
