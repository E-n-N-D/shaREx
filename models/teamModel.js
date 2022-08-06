const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        memberWallets: {
            //individual team members wallet id
            type: Array,
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

module.exports = mongoose.model("teams", teamSchema);
