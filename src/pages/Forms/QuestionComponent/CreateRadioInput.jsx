import React, { useState } from 'react';
import CircleTickIcon from '../../../components/svgIcons/CircleTickIcon';
import SmallCloseButton from '../../../components/svgIcons/SmallCloseButton';

const CreateRadioInput = ({
  question,
  handleSaveQuestion,
  handleDeleteQuestion,
}) => {
  const [questionLabel, setQuestionLabel] = useState(question?.question || '');
  const [options, setOptions] = useState(
    question?.questionOptions ? JSON.parse(question?.questionOptions) : []
  );
  const [isChanged, setIsChanged] = useState(false); // Track if the form has changes
  const [isValid, setIsValid] = useState(false); // Track if the form is valid (at least one option)

  // Store the initial values for comparison
  const initialQuestionLabel = question?.question || '';
  const initialOptions = question?.questionOptions
    ? JSON.parse(question?.questionOptions)
    : [];

  // Handle question label change
  const handleQuestionChange = (e) => {
    setQuestionLabel(e.target.value);
    checkChanges(e.target.value, options);
  };

  // Handle option value change
  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].values = event.target.value;
    setOptions(newOptions);
    checkChanges(questionLabel, newOptions);
  };

  // Add a new option
  const addOption = () => {
    const newOptions = [...options, { optionType: 'radio', values: '' }];
    setOptions(newOptions);
    checkChanges(questionLabel, newOptions);
  };

  // Remove an option
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    checkChanges(questionLabel, newOptions);
  };

  // Check if there are changes from the initial state
  const checkChanges = (newQuestionLabel, newOptions) => {
    const optionsChanged =
      JSON.stringify(initialOptions) !== JSON.stringify(newOptions);
    const questionChanged = initialQuestionLabel !== newQuestionLabel;

    // Check if there's at least one valid option
    const hasValidOption = newOptions.some(
      (option) => option.values.trim() !== ''
    );
    setIsValid(hasValidOption);

    setIsChanged((optionsChanged || questionChanged) && hasValidOption); // Enable save button only if changes exist and there's a valid option
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredOptions = options.filter(
      (option) => option.values.trim() !== ''
    );

    const data = {
      question: questionLabel,
      questionOptions: filteredOptions.length > 0 ? filteredOptions : '',
      questionType: 'radio', // Mark question as radio type
      id: question?.id || '',
    };

    handleSaveQuestion(data);
    setIsChanged(false); // Reset changes state after saving
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="request-table attch-card mh-auto mb-3"
    >
      <div className="rt-head">
        <div className="row">
          <div className="col-md-8 order-2 order-sm-2 order-md-1">
            <div className="edit-form-div">
              <div className="ef-group mb-4">
                <label>Type question here</label>
                <textarea
                  rows="2"
                  className="form-control"
                  value={questionLabel}
                  onChange={handleQuestionChange}
                  placeholder="Enter your question"
                />
              </div>

              {/* Render Options */}
              <div className="ef-radio-group">
                {options.map((option, index) => (
                  <div key={index}>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      {/* Custom radio input next to the text input */}
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="custom-radio"
                          className="form-check-input"
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Option ${index + 1}`}
                          value={option.values}
                          onChange={(e) => handleOptionChange(index, e)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={() => removeOption(index)}
                      >
                        <SmallCloseButton />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add more options */}
              <div className="add-more-div">
                <button type="button" className="btn p-0" onClick={addOption}>
                  + Add option
                </button>
              </div>

              {/* Save or Delete Question */}
              <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-5">
                <button
                  type="submit"
                  className={`btn btn-primary-light`}
                  disabled={(!isChanged || !isValid) && question.id} // Disable the button if no changes or no valid option
                >
                  <CircleTickIcon />
                  Save question
                </button>
                <button
                  className="btn p-0"
                  type="button"
                  onClick={() =>
                    handleDeleteQuestion(question?.id, question?.tempId)
                  }
                >
                  Delete question
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 order-1 order-sm-1 order-md-2">
            <div className="ef-right-div">
              <div className="efr-group mb-4">
                <label>Question category</label>
                <input className="form-control" value="Form" readOnly />
              </div>
              <div className="efr-group mb-4">
                <label>Response type</label>
                <input className="form-control" value="Radio" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateRadioInput;
