const mongoose = require("mongoose");

const InvitationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invitation", InvitationSchema);
