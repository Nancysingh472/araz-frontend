import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill'; // Import Quill here
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ setContent, questionList, content }) => {
  const quillRef = useRef(null);

  const handleInsertPlaceholder = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = questionList.find(
      (item) => item.id.toString() === selectedValue
    );
    if (selectedItem && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const cursorPosition = quill.getSelection()?.index || 0;
      const placeholder = `{{${selectedItem.question}}}`;
      quill.insertText(cursorPosition, placeholder);
    }
    event.target.value = null;
  };
  console.log("questionList:", questionList);

  const handleClear = () => {
    setContent('');
  };

  return (
    <div>
      {questionList.length > 0 && (
        <div className="d-flex align-items-center canvas-group mb-2">
          <label className="me-2 mb-0">Select Form Variable</label>
          <select
            className="form-control"
            name="categoryId"
            value=""
            onChange={handleInsertPlaceholder}
            style={{ width: '200px' }}
          >
            <option value="">Select Variable</option>
            {questionList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.question}
              </option>
            ))}
          </select>
        </div>
      )}

      <ReactQuill
        ref={quillRef} // Attach ref to ReactQuill
        value={content}
        onChange={setContent}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        placeholder="Write something here..."
        style={{ height: '300px', marginBottom: '50px' }}
      />

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

// Configuring modules (toolbar options)
TextEditor.modules = {
  toolbar: [
    [
      { header: '1' },
      { header: '2' },
      { font: ['arabic', 'monospace', 'serif'] },
    ],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link'],
    [{ direction: 'rtl' }, { direction: 'ltr' }], // Add RTL/LTR direction to toolbar
  ],
};

// Configuring supported formats
TextEditor.formats = [
  'header',
  'font',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'align',
  'link',
  'image',
];

const Font = Quill.import('formats/font');
Font.whitelist = ['arabic', 'monospace', 'serif']; // Add your custom font to the whitelist
Quill.register(Font, true);

export default TextEditor;
