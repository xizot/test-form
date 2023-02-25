import { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
const IndexPage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const generatePdf = async (e) => {
        e.preventDefault();
        setPdfUrl('');

        try {
            // Send a POST request to the serverless function
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, age, phone }),
            });

            const resJson = await response.json();

            if (response.status != 200) {
                throw Error(resJson.errorMessage);
            }

            window.location.assign(resJson.path);

            setPdfUrl(resJson.path);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="main">
            <form onSubmit={generatePdf} className="sign-box">
                <h3 className="form-title">Tạo File</h3>
                <div className="form-control">
                    <label className="form-label">Name:</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-control">
                    <label className="form-label">Age:</label>

                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-control">
                    <label className="form-label">Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-control">
                    <label className="form-label">Signature:</label>
                    <div>
                        <SignatureCanvas
                            penColor="black"
                            canvasProps={{
                                width: 200,
                                height: 200,
                                className: 'sign-box__sig',
                            }}
                        />
                    </div>
                </div>
                <button type="submit" className="form-submit">
                    Tạo HĐ
                </button>
            </form>
        </div>
    );
};

export default IndexPage;
