import { NextApiRequest, NextApiResponse } from "next";



// Define the constants
const API_KEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORER_ID = process.env.NEXT_PUBLIC_GC_SCORER_ID;
const BASE_URI = "https://api.scorer.gitcoin.co";

// these lines add the corretc header information to the request
const headers = API_KEY ? ({
  "Content-Type": "application/json",
  "X-API-Key": API_KEY,
}) : undefined



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  console.log(address);
  try {
    const response = await fetch(`${BASE_URI}/registry/score/${SCORER_ID}/${address}`, { headers });
    console.log("response", response); // Log the response object to inspect it
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json({ score: data.score });
    } else {
      res.status(response.status).json({ error: "Failed to retrieve passport score" });
    }
  } catch (error) {
    console.log("Failed to retrieve passport score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
