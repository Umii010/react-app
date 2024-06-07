import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Alert from './Alert'; // Import Alert component

export default function Text_Form(props) {
  const [text, setText] = useState('null');

  const showAlert = props.showAlert; // Get showAlert from props

  const handleCopy = () => {
    let textArea = document.getElementById('my_box');
    if (textArea) {
      textArea.select();
      navigator.clipboard.writeText(textArea.value);
      showAlert('Text has been copied to the clipboard Successfully', 'success');
      console.log('Text has been copied to the clipboard');
    } else {
      console.error('Textarea element not found');
    }
  };

  const handleUpClick = () => {
    let newtext = text.toUpperCase();
    setText(newtext);
    showAlert('Converted to Upper Case Successfully', 'success');
  };

  const handleLoClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
    showAlert('Converted to Lower Case Successfully', 'success');
  };

  const handleClearClick = () => {
    setText('');
    showAlert('Cleared Successfully', 'success');
  };

  const handleSaveClick = () => {
    const fileContent = text;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'text_file.txt');
    showAlert('Downloaded Successfully', 'success');
  };

  const cleanUpText = (inputText) => {
    const lines = inputText.split('\n');
    const cleanedLines = lines.map((line) => {
      const regex = /\s+/g;
      const cleanedLine = line.replace(regex, ' ');
      return cleanedLine;
    });
    const cleanedText = cleanedLines.join('\n');
    return cleanedText;
  };

  const handleOnChange = (event) => {
    const cleanedText = cleanUpText(event.target.value);
    setText(cleanedText);
  };

  const handleCleanClick = () => {
    console.log('Before cleaning:', text);
    const cleanedText = cleanUpText(text);
    console.log('After cleaning:', cleanedText);
    setText(cleanedText);
  };

  return (

    // {alert && (
    //   <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
    //     {alert.msg}
    //   </div>
    // )}
    // <div className={`container my-4 bg-${mode}`} style={{ color: mode === 'dark' ? 'white' : 'black' }}>
    //   <Text_Form mode={mode} showAlert={showAlert} />
    // </div>
    <div className={`container my-4 bg-${props.mode}`} style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
      <div>
        <div className="mb-3">
          <label htmlFor="my_box" className="form-label">
            {props.heading}
          </label>
          <textarea
            className="form-control"
            style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? '#333' : 'white' }}
            id="my_box"
            rows="6"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <button className="btn btn-success mx-1" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-danger mx-1" onClick={handleClearClick}>
          Clear Text
        </button>
        <button className="btn btn-info mx-1" onClick={handleSaveClick}>
          Save
        </button>
        <button className="btn btn-warning mx-1" onClick={handleCleanClick}>
          Clean Text
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleCopy}>
          Copy Text
        </button>
      </div>
      <div className="my-3">
        <h2 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Your Text Summary</h2>
        <p>
          {text.split(' ').filter((word) => word.trim() !== '').length} words and{' '}
          {text.replace(/\s/g, '').length} characters
        </p>
        <p>{0.008 * text.split(' ').filter((word) => word.trim() !== '').length} Minutes read</p>
      </div>
    </div>
  );
}
