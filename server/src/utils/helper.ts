import fs from "fs/promises";

export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const ensureFileExists = async <T>(
  path: string,
  defaultData: T
): Promise<void> => {
  try {
    await fs.access(path);
  } catch {
    try {
      await fs.writeFile(path, JSON.stringify(defaultData, null, 2), {
        encoding: "utf-8",
      });
      console.log(`File created at: ${path}`);
    } catch (error) {
      console.error(`Failed to create file at ${path}:`, error);
    }
  }
};

export const readFileData = async <T>(
  filePath: string,
  defaultData: T
): Promise<T> => {
  await ensureFileExists(filePath, defaultData);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return defaultData; // Return default data if there's an error
  }
};

export const writeFileData = async <T>(filePath: string, data: T): Promise<void> => {
  await ensureFileExists(filePath, data);

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
      encoding: "utf-8",
    });
    console.log(`File written at: ${filePath}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
};
