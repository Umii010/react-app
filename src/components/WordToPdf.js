import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const WordToPdf = () => {
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressVariant, setProgressVariant] = useState('success');
  const [isReducing, setIsReducing] = useState(false);

  useEffect(() => {
    let timer;
    if (isReducing) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress > 0) {
            return prevProgress - 1;
          } else {
            clearInterval(timer);
            setShowToast(false);
            setIsReducing(false);
            return 0;
          }
        });
      }, 40); // Reducing progress over 4 seconds (4000ms / 100)
    }

    return () => {
      clearInterval(timer);
    };
  }, [isReducing]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validExtensions = ['doc', 'docx'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      setToastMessage('File uploaded successfully.');
      setProgressVariant('success');
      setProgress(100);
      setShowToast(true);
      setIsReducing(true);
    } else {
      setFile(null);
      setToastMessage('Please upload a valid Word document (.doc or .docx).');
      setProgressVariant('danger');
      setProgress(100);
      setShowToast(true);
      setIsReducing(true);
    }
  };

  const convertToPdf = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('YOUR_API_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // important for handling binary data
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            setProgress(Math.floor((loaded / total) * 100));
          },
        });

        // Handle the response to download the PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'converted.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setToastMessage('File converted successfully.');
        setProgressVariant('success');
        setProgress(100);
        setShowToast(true);
        setIsReducing(true);
      } catch (error) {
        console.error('Error converting file:', error);
        setToastMessage('Error converting file. Please try again.');
        setProgressVariant('danger');
        setProgress(100);
        setShowToast(true);
        setIsReducing(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Word to PDF Converter</h2>
      <div className="mb-3">
        <label className="btn btn-primary">
          <FontAwesomeIcon icon={faFileUpload} className="me-2" />
          Select Word File
          <input type="file" accept=".doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
      </div>
      <button onClick={convertToPdf} className="btn btn-success">Convert to PDF</button>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={progressVariant}>
          <Toast.Header>
            <FontAwesomeIcon icon={progressVariant === 'success' ? faCheckCircle : faExclamationTriangle} className="me-2" />
            <strong className="me-auto">File Upload Status</strong>
          </Toast.Header>
          <Toast.Body>
            {toastMessage}
            <ProgressBar animated now={progress} variant={progressVariant} />
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default WordToPdf;
