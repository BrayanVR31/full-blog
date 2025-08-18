import { DataSource } from "typeorm";
import { Category } from "@/models/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  synchronize: true,
  logging: true,
  migrations: [],
  subscribers: [],
  entities: [Category],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};
