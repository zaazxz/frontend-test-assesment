import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Getting the file path
const filePath = path.join(process.cwd(), "data", "designs.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const designs = JSON.parse(fileData);

    // READ data
    if (req.method === "GET") {
        return res.status(200).json(designs);
    }

    // CREATE data
    if (req.method === "POST") {
        const newDesign = {
            id: designs.length + 1,
            ...req.body,
        };

        const updated = [...designs, newDesign];
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

        return res.status(201).json(newDesign);
    }

    res.status(405).end();

}