import React, { useState, useEffect } from 'react';
import CircleTickIcon from '../../../components/svgIcons/CircleTickIcon';
import { FILE_TYPES } from '../../../utils/constant';

const CreateInputFile = ({
  initialQuestion,
  handleSaveQuestion,
  handleDeleteQuestion,
}) => {
  const initialQuestionLabel = initialQuestion?.question || '';
  const initialOptions = initialQuestion?.questionOptions
    ? JSON.parse(initialQuestion?.questionOptions)
    : [];

  // Extract the values for fileTypes, minFiles, and fileSize from initialOptions
  const initialFileTypes =
    initialOptions.find((option) => option.optionType === 'fileType')?.values ||
    [];
  const initialMinFiles =
    initialOptions.find((option) => option.optionType === 'minFiles')?.values ||
    1;
  const initialFileSize =
    initialOptions.find((option) => option.optionType === 'fileSize')?.values ||
    5;

  const [question, setQuestion] = useState(initialQuestionLabel || '');
  const [options, setOptions] = useState({
    fileTypes: initialFileTypes, // Array of selected file types
    minFiles: initialMinFiles, // Minimum number of files
    fileSize: initialFileSize, // Minimum file size in MB
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    // Extract initial values for comparison
    const initialFileTypes =
      initialOptions.find((option) => option.optionType === 'fileType')
        ?.values || [];
    const initialMinFiles =
      initialOptions.find((option) => option.optionType === 'minFiles')
        ?.values || 1;
    const initialFileSize =
      initialOptions.find((option) => option.optionType === 'fileSize')
        ?.values || 5;

    // Check if the current form state is different from the initial state
    const isQuestionChanged = question !== initialQuestionLabel;
    const isFileTypesChanged =
      JSON.stringify(options.fileTypes) !== JSON.stringify(initialFileTypes);
    const isMinFilesChanged = options.minFiles !== initialMinFiles;
    const isFileSizeChanged = options.fileSize !== initialFileSize;

    setIsFormChanged(
      isQuestionChanged ||
        isFileTypesChanged ||
        isMinFilesChanged ||
        isFileSizeChanged
    );
  }, [question, options, initialQuestionLabel]); // Add initialOptions as a dependency

  const handleFileTypeChange = (type) => {
    setOptions((prevOptions) => {
      const newFileTypes = prevOptions.fileTypes.includes(type)
        ? prevOptions.fileTypes.filter((t) => t !== type) // Remove if already selected
        : [...prevOptions.fileTypes, type]; // Add if not selected

      return { ...prevOptions, fileTypes: newFileTypes };
    });
  };

  const handleMinFilesChange = (e) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      minFiles: parseInt(e.target.value, 10),
    }));
  };

  const handleFileSizeChange = (e) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      fileSize: parseInt(e.target.value, 10),
    }));
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      question: question,
      questionOptions: [
        { optionType: 'fileType', values: options.fileTypes },
        { optionType: 'fileSize', values: options.fileSize },
        { optionType: 'minFiles', values: options.minFiles },
      ],
      questionType: 'fileUpload',
      id: initialQuestion?.id || '',
    };

    handleSaveQuestion(data);
    setIsFormChanged(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="request-table attch-card mh-auto mb-3"
    >
      <div className="rt-head">
        <div className="row">
          <div className="col-md-4 order-1 order-sm-1 order-md-2">
            <div className="ef-right-div">
              <div className="efr-group mb-4">
                <label>Question category</label>
                <input className="form-control" value="Form" readOnly />
              </div>
              <div className="efr-group mb-4">
                <label>Response type</label>
                <input className="form-control" value="FileInput" readOnly />
              </div>
            </div>
          </div>

          <div className="col-md-8 order-2 order-sm-2 order-md-1">
            <div className="edit-form-div">
              <div className="ef-group mb-4">
                <label>Type question here</label>
                <textarea
                  rows="2"
                  className="form-control"
                  value={question}
                  onChange={handleQuestionChange}
                />
              </div>

              <div className="specific-list">
                <h6 className="mb-4">Allow only specific file types</h6>
                <div className="row">
                  {FILE_TYPES.map((type) => (
                    <div className="col-6 col-sm-4 col-md-4" key={type}>
                      <div className="custom-form-check mb-4">
                        <input
                          type="checkbox"
                          checked={options.fileTypes.includes(type)}
                          onChange={() => handleFileTypeChange(type)}
                        />
                        <label>{type}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 order-3 order-sm-3 order-md-2">
            <div className="minimum-box mt-3">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <p className="color-light">Minimum number of files</p>
                </div>
                <div className="col-sm-4">
                  <div className="efr-group">
                    <select
                      className="form-control"
                      value={options.minFiles}
                      onChange={handleMinFilesChange}
                    >
                      <option value={1}>1</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="minimum-box pb-0">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <p className="color-light">Minimum file size</p>
                </div>
                <div className="col-sm-4">
                  <div className="efr-group mb-4">
                    <select
                      className="form-control"
                      value={options.fileSize}
                      onChange={handleFileSizeChange}
                    >
                      <option value={5}>5 MB</option>
                      <option value={10}>10 MB</option>
                      <option value={20}>20 MB</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-4">
              <button
                type="submit"
                className="btn btn-primary-light"
                disabled={!isFormChanged && initialQuestion?.id} // Disable button if there are no changes
              >
                <CircleTickIcon />
                Save question
              </button>
              <button
                className="btn p-0"
                type="button"
                onClick={() =>
                  handleDeleteQuestion(
                    initialQuestion?.id,
                    initialQuestion?.tempId
                  )
                } // Call delete handler with question ID
              >
                Delete question
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateInputFile;
