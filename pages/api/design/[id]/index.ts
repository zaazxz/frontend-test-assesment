import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "designs.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const fileData = fs.readFileSync(filePath, "utf-8");
    const designs = JSON.parse(fileData); 

    const index = designs.findIndex((d: any) => d.id === Number(id));
    if (index === -1) return res.status(404).end();

    if (req.method === "GET") {
        return res.status(200).json(designs[index]);
    }

    if (req.method === "POST") {
        const newFlow = {
            ...req.body,
            lastUpdated: new Date().toISOString(),
        };

        designs[index].flowVersion.push(newFlow);
        fs.writeFileSync(filePath, JSON.stringify(designs, null, 2));

        return res.status(200).json(designs[index]);
    }

    return res.status(405).end();

}