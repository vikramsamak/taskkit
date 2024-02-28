import { dbConnect } from "@/db/connect";

export async function POST(req) {
  const dbConnection = await dbConnect();
}
