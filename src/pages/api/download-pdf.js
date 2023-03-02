import { readFileSync } from "fs";
import path from "path";

export default async (req, res) => {
    try {
        const filePath = path.join("/tmp", "template_filled.pdf'");
        const pdfBuffer = readFileSync(filePath);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="template_filled.pdf"'
        );
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while generating the PDF file");
    }
};
