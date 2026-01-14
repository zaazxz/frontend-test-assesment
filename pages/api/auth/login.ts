import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const filepath = path.join(process.cwd(), "data", "users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    // Check request method
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // Get data from request body
    const { email, password } = req.body;

    // Read data from file and search for user
    const users = JSON.parse(fs.readFileSync(filepath, "utf-8"));
    const user = users.find((u: any) => (
        u.email === email && u.password === password
    ));

    // Validation from server
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
            description: "Invalid email or password"
        });
    }

    return res.status(200).json({
        token: crypto.randomUUID(),
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    });

}