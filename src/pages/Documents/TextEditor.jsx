import React, { useEffect, useRef } from 'react';
// import ReactQuill, { Quill } from 'react-quill'; // Import Quill here
// import 'react-quill/dist/quill.snow.css';

import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ setContent, questionList, content }) => {
  const editorRef = useRef(null);

  const handleClear = () => {
    setContent('');
  };

  return (
    <div>
      {/*<ReactQuill*/}
      {/*  ref={quillRef} // Attach ref to ReactQuill*/}
      {/*  value={content}*/}
      {/*  onChange={setContent}*/}
      {/*  modules={TextEditor.modules}*/}
      {/*  formats={TextEditor.formats}*/}
      {/*  placeholder="Write something here..."*/}
      {/*  style={{ height: '300px', marginBottom: '50px' }}*/}
      {/*/>*/}

      <Editor
        onEditorChange={e => setContent(e)}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.ui.registry.addMenuButton('variablesDropdown', {
            text: 'Select from Variable',
            fetch: (callback) => {
              const items = questionList.map((variable) => ({
                type: 'menuitem',
                text: variable.question,
                onAction: () => {
                  editor.insertContent(`{{${variable.question}}}`);
                },
              }));
              items.push({
                type: 'menuitem',
                text: 'User name',
                onAction: () => {
                  editor.insertContent(`{{USER_NAME}}`);
                },
              })
              items.push({
                type: 'menuitem',
                text: 'Date',
                onAction: () => {
                  editor.insertContent(`{{DATE}}`);
                },
              })
              callback(items);
            },
          });
        }}
        init={{
          placeholder: 'Make your document here',
          automatic_uploads: true,
          file_picker_types: 'image',
          content_style: `
                                              @font-face {
  font-family: 'AlKanz';
  src: url('../public/fonts/al-kanz/kanz-al-marjaan-webfont.woff2') format('woff2'),
  url('../public/fonts/al-kanz/kanz-al-marjaan-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
                              body { font-family: 'AlKanz', sans-serif; }
                        `,
          font_family_formats: "Al Kanz=AlKanz, sans-serif; Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Courier New=courier new,courier,monospace;",
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (e) => {
              const file = e.target.files[0];

              if (file) {
                const reader = new FileReader();

                reader.onload = (event) => {
                  const base64 = event.target.result; // Base64 string
                  cb(base64, { title: file.name }); // Insert image in the editor
                };

                reader.readAsDataURL(file); // Convert image to Base64
              }
            });

            input.click();
          },
          plugins: ['code', 'table', 'image'],
          toolbar: 'alignleft aligncenter alignright alignjustify variablesDropdown image code bold italic',
        }} value={content} apiKey={'6hk1fx2l4fkz6chacbn6e7oyflei77j1nl0ws67fbe391oop'} />

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

// Configuring modules (toolbar options)
// TextEditor.modules = {
//   toolbar: [
//     [
//       { header: '1' },
//       { header: '2' },
//       { font: ['arabic', 'monospace', 'serif'] },
//     ],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ['link'],
//     [{ direction: 'rtl' }, { direction: 'ltr' }], // Add RTL/LTR direction to toolbar
//   ],
// };
//
// // Configuring supported formats
// TextEditor.formats = [
//   'header',
//   'font',
//   'list',
//   'bullet',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'color',
//   'background',
//   'align',
//   'link',
//   'image',
// ];
//
// const Font = Quill.import('formats/font');
// Font.whitelist = ['arabic', 'monospace', 'serif']; // Add your custom font to the whitelist
// Quill.register(Font, true);

export default TextEditor;
