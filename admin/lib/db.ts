import { AppDataSource } from "@/lib/data-source";

let dataSource: typeof AppDataSource | null = null;

/**
 *  Ensures a single instance of database
 *  connection when it's initialized for once time
 * */
export async function getDB() {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  if (!dataSource) {
    dataSource = AppDataSource;
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
