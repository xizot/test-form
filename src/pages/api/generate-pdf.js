import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { PDFDocument, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default async (req, res) => {
    try {
        // Get the form data from the request body
        const { name, age, phone } = req.body;

        if (!name || !age || !phone) {
            return res.status(500).json({
                errorMessage: "Vui lòng điền đầy đủ thông tin",
            });
        }

        // Load the PDF template file
        const templatePath = path.resolve(process.cwd(), "public/template.pdf");
        const pdfBuffer = readFileSync(templatePath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        const fontByes = readFileSync(
            path.resolve(process.cwd(), "public/SVN-Times New Roman.ttf")
        );
        pdfDoc.registerFontkit(fontkit);
        const font = await pdfDoc.embedFont(fontByes);

        const form = pdfDoc.getForm();

        const nameField = form.getTextField("name");
        const ageField = form.getTextField("age");
        const phoneField = form.getTextField("phone");
        nameField.setText(name);
        ageField.setText(age);
        phoneField.setText(phone);

        form.updateFieldAppearances(font);

        // Serialize the PDF document and send it as a response
        const pdfBytes = await pdfDoc.save();
        const filePath = path.join("/tmp", "template_filled.pdf'");
        writeFileSync(filePath, pdfBytes, { encoding: "utf8", flag: "w" });

        res.status(200).json({
            message: "ok",
            path: "/api/download-pdf",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errorMessage: "An error occurred while generating the PDF file",
        });
    }
};
