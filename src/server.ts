import { createApp } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";

dotenv.config();

export async function startServer() {
    try {
        const app = createApp();
        const PORT = 3002;

        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}
startServer();