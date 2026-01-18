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

    if (req.method === "PATCH") {
        const { flowVersionId, minifiConfigVersion } = req.body;

        if (!flowVersionId || !minifiConfigVersion) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        const flowIndex = designs[index].flowVersion.findIndex(
            (f: any) => f.id === flowVersionId
        );

        if (flowIndex === -1) {
            return res.status(404).json({ message: "Flow version not found" });
        }

        designs[index].flowVersion[flowIndex] = {
            ...designs[index].flowVersion[flowIndex],
            minifiConfigVersion,
            lastUpdated: new Date().toISOString(),
        };

        fs.writeFileSync(filePath, JSON.stringify(designs, null, 2));

        return res.status(200).json(designs[index]);
    }

    return res.status(405).end();

}