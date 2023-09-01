import sanitizedConfig from "../config/config";
import { app } from "./app";
import { initDataBase } from "./initDatabase";


initDataBase();

export const server = app.listen(sanitizedConfig.PORT, () => {
    console.log(`Server is listening on port ${sanitizedConfig.PORT}! 🍄 `);
  });