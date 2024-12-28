import fs from "fs";
import path from "path";

// Konfigurasi file log
const logFilePath = path.resolve("logs", "server.log");

// Pastikan direktori log dan file log ada
const ensureLogFileExists = () => {
  const logDirectory = path.dirname(logFilePath);
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", { flag: "a" });
  }
};

// Fungsi untuk menulis log ke file
const writeLogToFile = (logMessage: string) => {
  ensureLogFileExists();
  fs.appendFile(logFilePath, logMessage + "\n", (err) => {
    if (err) {
      console.error("Failed to write log to file:", err);
    }
  });
};

// Custom logger dengan log level
const createLogger = (level: string) => {
  return (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    const node = process.env.NODE_ENV || "development";
    if (node == "development") {
      console.log(logMessage); // Cetak ke console
    }
    writeLogToFile(logMessage); // Simpan ke file
  };
};

// Logger dengan level berbeda
export const logger = {
  info: createLogger("INFO"),
  error: createLogger("ERROR"),
  debug: createLogger("DEBUG"),
};
