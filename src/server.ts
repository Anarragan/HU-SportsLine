import { createApp } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

export async function startServer() {
    try {
        const app = createApp();
        const PORT = 3002;
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}
startServer();