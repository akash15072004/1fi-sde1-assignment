import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./prisma";

dotenv.config();

const port = Number(process.env.PORT || 5000);

const server = app.listen(port, () => {
  console.log(`1Fi EMI API running on http://localhost:${port}`);
});

async function shutdown() {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
