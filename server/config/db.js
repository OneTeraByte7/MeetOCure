const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGO_ATLAS_URI;
        if (!uri) {
            console.error(
                "No MongoDB connection string found. Set MONGO_URI or MONGO_ATLAS_URI in your environment."
            );
            process.exit(1);
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection successful");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;