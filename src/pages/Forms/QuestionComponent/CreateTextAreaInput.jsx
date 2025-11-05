import React, { useState } from 'react';
import CircleTickIcon from '../../../components/svgIcons/CircleTickIcon';

const CreateTextareaInput = ({
  question,
  handleSaveQuestion,
  handleDeleteQuestion,
}) => {
  const [questionLabel, setQuestionLabel] = useState(question?.question || '');
  const [selectedRows, setSelectedRows] = useState(4
  );
  const [isChanged, setIsChanged] = useState(false); // Track if the form has changes
  const initialQuestionLabel = question?.question || '';
  const initialSelectedRows = question?.questionOptions?.[0]?.value || 4;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      question: questionLabel,
      questionOptions: [{ optionType: 'row', values: selectedRows }],
      questionType: 'textarea',
      id: question?.id || '',
    };

    handleSaveQuestion(data);
    setIsChanged(false); // Reset change state after saving
  };

  // Handle question label change
  const handleQuestionChange = (e) => {
    const newValue = e.target.value;
    setQuestionLabel(newValue);

    // Check if the input is different from the initial state
    if (
      (newValue !== initialQuestionLabel ||
        selectedRows !== initialSelectedRows) &&
      newValue.trim() !== ''
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  // Handle row dropdown change
  const handleRowChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSelectedRows(newValue);

    // Check if the selected value is different from the initial state
    if (
      (newValue !== initialSelectedRows ||
        questionLabel !== initialQuestionLabel) &&
      questionLabel.trim() !== ''
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
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
              <div className="efr-group mb-4">
                <label>Response type</label>
                <select
                  className="form-control"
                  value={selectedRows}
                  onChange={handleRowChange}
                >
                  <option value={2}>2 rows</option>
                  <option value={4}>4 rows</option>
                  <option value={6}>6 rows</option>
                  <option value={8}>8 rows</option>
                </select>
              </div>
              <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-5">
                <button
                  className={`btn btn-primary-light`}
                  type="submit"
                  disabled={!isChanged && question.id} // Disable the button if no changes or invalid
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
                <input className="form-control" value="TextArea" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTextareaInput;
