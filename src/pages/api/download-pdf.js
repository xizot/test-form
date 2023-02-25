import { readFileSync } from 'fs';
import path from 'path';

export default async (req, res) => {
    try {
        const templatePath = path.resolve(
            process.cwd(),
            'public/template_filled.pdf'
        );
        const pdfBuffer = readFileSync(templatePath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="template_filled.pdf"'
        );
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the PDF file');
    }
};
