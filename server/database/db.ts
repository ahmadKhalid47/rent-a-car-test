import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGODB_URI || '';

const connectDB = async (retries: number = 5, delay: number = 5000): Promise<void> => {
    if (!dbUrl) {
        console.error("MongoDB URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(dbUrl);
        console.log(`Database connected with ${mongoose.connection.host}`);
    } catch (error: any) {
        console.error(`Database connection failed: ${error.message}`);
        if (retries > 0) {
            console.log(`Retrying in ${delay / 1000} seconds...`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        } else {
            console.error("Max retries reached. Exiting...");
            process.exit(1);
        }
    }
};

export default connectDB;
