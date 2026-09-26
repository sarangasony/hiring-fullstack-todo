import mongoose from "mongoose";
import dns from "dns";

export const connectDatabase = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing");
  }

  mongoose.set("strictQuery", true);

  if (process.env.DNS_SERVERS) {
    dns.setServers(
      process.env.DNS_SERVERS.split(",")
        .map((server) => server.trim())
        .filter(Boolean)
    );
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};
