import mongoose from "mongoose";

const UserWatchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    investors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Investor" }], // Saved investors
});

const UserWatchlist = mongoose.models.UserWatchlist || mongoose.model("UserWatchlist", UserWatchlistSchema);

export default UserWatchlist;