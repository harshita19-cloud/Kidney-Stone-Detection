import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState('');
  const [reportText, setReportText] = useState('');
  const [voiceUrl, setVoiceUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/upload-scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAnnotatedImage(`http://localhost:5000/static/${res.data.annotated_image}`);
      setVoiceUrl(`http://localhost:5000/static/${res.data.voice_mp3}`);
      setPdfUrl(`http://localhost:5000/static/${res.data.pdf_report}`);

    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="App">
      <h1>Kidney Stone Detection System</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit Scan</button>

      {annotatedImage && (
        <div>
          <h2>Annotated Scan</h2>
          <img src={annotatedImage} alt="Annotated Kidney Scan" style={{ width: '500px' }} />

          <h2>Report</h2>
          <p>{reportText}</p>

          <audio controls>
            <source src={voiceUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Download PDF Report
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

