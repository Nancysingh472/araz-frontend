import React from 'react';

const AdminFormEdit = () => {
  return (
    <div className="form-edit-content px-20">
      <div
        className="offcanvas offcanvas-end custom-canvas-div"
        tabIndex="-1"
        id="Add_Questionl"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add a question</h5>
          <div className="canv-right-btn">
            <button className="btn btn-primary">Save</button>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7342 0.274897C11.65 0.190519 11.55 0.123576 11.4399 0.0779014C11.3298 0.0322267 11.2117 0.00871629 11.0925 0.00871629C10.9733 0.00871629 10.8553 0.0322267 10.7452 0.0779014C10.6351 0.123576 10.535 0.190519 10.4508 0.274897L6 4.71663L1.54916 0.265794C1.4649 0.181527 1.36486 0.114683 1.25476 0.0690775C1.14466 0.0234724 1.02665 8.879e-10 0.90748 0C0.788308 -8.879e-10 0.670302 0.0234724 0.560202 0.0690775C0.450101 0.114683 0.350062 0.181527 0.265794 0.265794C0.181527 0.350062 0.114683 0.450101 0.0690775 0.560202C0.0234724 0.670302 -8.879e-10 0.788308 0 0.90748C8.879e-10 1.02665 0.0234724 1.14466 0.0690775 1.25476C0.114683 1.36486 0.181527 1.4649 0.265794 1.54916L4.71663 6L0.265794 10.4508C0.181527 10.5351 0.114683 10.6351 0.0690775 10.7452C0.0234724 10.8553 0 10.9733 0 11.0925C0 11.2117 0.0234724 11.3297 0.0690775 11.4398C0.114683 11.5499 0.181527 11.6499 0.265794 11.7342C0.350062 11.8185 0.450101 11.8853 0.560202 11.9309C0.670302 11.9765 0.788308 12 0.90748 12C1.02665 12 1.14466 11.9765 1.25476 11.9309C1.36486 11.8853 1.4649 11.8185 1.54916 11.7342L6 7.28337L10.4508 11.7342C10.5351 11.8185 10.6351 11.8853 10.7452 11.9309C10.8553 11.9765 10.9733 12 11.0925 12C11.2117 12 11.3297 11.9765 11.4398 11.9309C11.5499 11.8853 11.6499 11.8185 11.7342 11.7342C11.8185 11.6499 11.8853 11.5499 11.9309 11.4398C11.9765 11.3297 12 11.2117 12 11.0925C12 10.9733 11.9765 10.8553 11.9309 10.7452C11.8853 10.6351 11.8185 10.5351 11.7342 10.4508L7.28337 6L11.7342 1.54916C12.0801 1.20329 12.0801 0.620769 11.7342 0.274897Z"
                  fill="#383C3E"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="canvas-group mb-4">
              <label>Name of the question</label>
              <input
                className="form-control"
                type="text"
                value="What is your business location?"
              />
            </div>
            <div className="canvas-group mb-4">
              <label>Type of field</label>
              <select className="form-control">
                <option>Paragraph</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Select jamaat</label>
              <select className="form-control">
                <option>Pune</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Select jamiat</label>
              <select className="form-control">
                <option>Pune</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid">
        <div className="admin-card" id="Edit_Form_Top">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5>
                    <a
                      href="#"
                      className="text-decoration-underline text-white text-regular"
                    >
                      Forms
                    </a>
                    <span className="text-regular">></span> Edit Form for
                    Business Name
                  </h5>
                </div>
                <div className="col-md-6">
                  <div className="table-filter-div">
                    <button
                      className="btn btn-light bg-white border-white"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#Add_Questionl"
                      aria-controls="offcanvasRight"
                    >
                      + Add question
                    </button>
                    <button className="btn btn-primary">Save form</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="ap-btn">
                      <button className="btn p-0 d-flex gap-3 align-items-center textcolor2 font-22">
                        Form for business name
                        <svg
                          width="25"
                          height="32"
                          viewBox="0 0 25 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5078 7.97235C24.0984 7.36964 24.4234 6.56921 24.4234 5.71777C24.4234 4.86632 24.0984 4.0659 23.5078 3.46319L21.0297 0.934359C20.4391 0.33165 19.6547 0 18.8203 0C17.9859 0 17.2016 0.33165 16.6125 0.932765L0 17.8325V24.8721H6.89531L23.5078 7.97235ZM18.8203 3.18894L21.3 5.71617L18.8156 8.24181L16.3375 5.71458L18.8203 3.18894ZM3.125 21.6832V19.156L14.125 7.96597L16.6031 10.4948L5.60469 21.6832H3.125ZM0 28.0611H25V31.25H0V28.0611Z"
                            fill="#A99368"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="prv-btn d-flex justify-content-end">
                      <a
                        href="#"
                        className="btn d-flex flex-column justify-content-center p-0 textcolor2 align-items-center gap-1"
                      >
                        <svg
                          width="43"
                          height="27"
                          viewBox="0 0 43 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3333 25.2C32.0111 25.2 40.6667 13.6 40.6667 13.6C40.6667 13.6 32.0111 2 21.3333 2C10.6555 2 2 13.6 2 13.6C2 13.6 10.6555 25.2 21.3333 25.2Z"
                            stroke="#A99368"
                            stroke-width="3"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.3333 18.4333C22.6152 18.4333 23.8446 17.924 24.751 17.0176C25.6574 16.1112 26.1667 14.8818 26.1667 13.5999C26.1667 12.3181 25.6574 11.0887 24.751 10.1823C23.8446 9.27583 22.6152 8.7666 21.3333 8.7666C20.0515 8.7666 18.8221 9.27583 17.9157 10.1823C17.0092 11.0887 16.5 12.3181 16.5 13.5999C16.5 14.8818 17.0092 16.1112 17.9157 17.0176C18.8221 17.924 20.0515 18.4333 21.3333 18.4333Z"
                            stroke="#A99368"
                            stroke-width="3"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>Preview</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row">
                  <div className="col-md-8 order-2 order-sm-2 order-md-1">
                    <div className="edit-form-div">
                      <div className="ef-group mb-4">
                        <label>Type question here</label>
                        <textarea rows="5" className="form-control">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </textarea>
                      </div>
                      <div className="ef-radio-group">
                        <div className="ef-radio-box">
                          <div className="d-flex align-items-center justify-content-between position-relative">
                            <input type="radio" name="option-radio" />
                            <label>Option 1</label>
                            <button className="btn p-0">
                              <svg
                                width="33"
                                height="33"
                                viewBox="0 0 33 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.8162 16.5732L11.4779 13.1983C11.2628 12.9732 11.1438 12.6717 11.1465 12.3588C11.1492 12.0459 11.2734 11.7466 11.4922 11.5253C11.7111 11.3041 12.0072 11.1786 12.3167 11.1759C12.6262 11.1731 12.9244 11.2934 13.147 11.5108L16.4853 14.8857L19.8236 11.5108C19.9325 11.3968 20.0628 11.3059 20.2068 11.2434C20.3508 11.1808 20.5057 11.1479 20.6624 11.1465C20.8192 11.1452 20.9746 11.1753 21.1197 11.2354C21.2648 11.2954 21.3966 11.384 21.5074 11.496C21.6182 11.6081 21.7059 11.7413 21.7652 11.888C21.8246 12.0346 21.8545 12.1918 21.8531 12.3502C21.8517 12.5087 21.8192 12.6653 21.7573 12.8109C21.6954 12.9565 21.6055 13.0882 21.4928 13.1983L18.1545 16.5732L21.4928 19.948C21.6055 20.0581 21.6954 20.1898 21.7573 20.3354C21.8192 20.481 21.8517 20.6376 21.8531 20.7961C21.8545 20.9545 21.8246 21.1117 21.7652 21.2583C21.7059 21.405 21.6182 21.5382 21.5074 21.6503C21.3966 21.7623 21.2648 21.8509 21.1197 21.911C20.9746 21.971 20.8192 22.0012 20.6624 21.9998C20.5057 21.9984 20.3508 21.9655 20.2068 21.9029C20.0628 21.8404 19.9325 21.7495 19.8236 21.6355L16.4853 18.2606L13.147 21.6355C12.9244 21.8529 12.6262 21.9732 12.3167 21.9704C12.0072 21.9677 11.7111 21.8422 11.4922 21.621C11.2734 21.3997 11.1492 21.1004 11.1465 20.7875C11.1438 20.4746 11.2628 20.1731 11.4779 19.948L14.8162 16.5732Z"
                                  fill="#383C3E"
                                />
                                <path
                                  d="M16.5 30.6429C18.3573 30.6429 20.1963 30.277 21.9122 29.5663C23.6281 28.8556 25.1872 27.8138 26.5005 26.5005C27.8138 25.1872 28.8556 23.6281 29.5663 21.9122C30.277 20.1963 30.6429 18.3573 30.6429 16.5C30.6429 14.6427 30.277 12.8037 29.5663 11.0878C28.8556 9.37187 27.8138 7.81278 26.5005 6.49949C25.1872 5.1862 23.6281 4.14445 21.9122 3.4337C20.1963 2.72296 18.3573 2.35714 16.5 2.35714C12.7491 2.35714 9.15179 3.84719 6.49949 6.49949C3.84719 9.15179 2.35714 12.7491 2.35714 16.5C2.35714 20.2509 3.84719 23.8482 6.49949 26.5005C9.15179 29.1528 12.7491 30.6429 16.5 30.6429ZM16.5 33C12.1239 33 7.92709 31.2616 4.83274 28.1673C1.73839 25.0729 0 20.8761 0 16.5C0 12.1239 1.73839 7.92709 4.83274 4.83274C7.92709 1.73839 12.1239 0 16.5 0C20.8761 0 25.0729 1.73839 28.1673 4.83274C31.2616 7.92709 33 12.1239 33 16.5C33 20.8761 31.2616 25.0729 28.1673 28.1673C25.0729 31.2616 20.8761 33 16.5 33Z"
                                  fill="#383C3E"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="ef-radio-box">
                          <div className="d-flex align-items-center justify-content-between position-relative">
                            <input type="radio" name="option-radio" />
                            <label>Option 2</label>
                            <button className="btn p-0">
                              <svg
                                width="33"
                                height="33"
                                viewBox="0 0 33 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.8162 16.5732L11.4779 13.1983C11.2628 12.9732 11.1438 12.6717 11.1465 12.3588C11.1492 12.0459 11.2734 11.7466 11.4922 11.5253C11.7111 11.3041 12.0072 11.1786 12.3167 11.1759C12.6262 11.1731 12.9244 11.2934 13.147 11.5108L16.4853 14.8857L19.8236 11.5108C19.9325 11.3968 20.0628 11.3059 20.2068 11.2434C20.3508 11.1808 20.5057 11.1479 20.6624 11.1465C20.8192 11.1452 20.9746 11.1753 21.1197 11.2354C21.2648 11.2954 21.3966 11.384 21.5074 11.496C21.6182 11.6081 21.7059 11.7413 21.7652 11.888C21.8246 12.0346 21.8545 12.1918 21.8531 12.3502C21.8517 12.5087 21.8192 12.6653 21.7573 12.8109C21.6954 12.9565 21.6055 13.0882 21.4928 13.1983L18.1545 16.5732L21.4928 19.948C21.6055 20.0581 21.6954 20.1898 21.7573 20.3354C21.8192 20.481 21.8517 20.6376 21.8531 20.7961C21.8545 20.9545 21.8246 21.1117 21.7652 21.2583C21.7059 21.405 21.6182 21.5382 21.5074 21.6503C21.3966 21.7623 21.2648 21.8509 21.1197 21.911C20.9746 21.971 20.8192 22.0012 20.6624 21.9998C20.5057 21.9984 20.3508 21.9655 20.2068 21.9029C20.0628 21.8404 19.9325 21.7495 19.8236 21.6355L16.4853 18.2606L13.147 21.6355C12.9244 21.8529 12.6262 21.9732 12.3167 21.9704C12.0072 21.9677 11.7111 21.8422 11.4922 21.621C11.2734 21.3997 11.1492 21.1004 11.1465 20.7875C11.1438 20.4746 11.2628 20.1731 11.4779 19.948L14.8162 16.5732Z"
                                  fill="#383C3E"
                                />
                                <path
                                  d="M16.5 30.6429C18.3573 30.6429 20.1963 30.277 21.9122 29.5663C23.6281 28.8556 25.1872 27.8138 26.5005 26.5005C27.8138 25.1872 28.8556 23.6281 29.5663 21.9122C30.277 20.1963 30.6429 18.3573 30.6429 16.5C30.6429 14.6427 30.277 12.8037 29.5663 11.0878C28.8556 9.37187 27.8138 7.81278 26.5005 6.49949C25.1872 5.1862 23.6281 4.14445 21.9122 3.4337C20.1963 2.72296 18.3573 2.35714 16.5 2.35714C12.7491 2.35714 9.15179 3.84719 6.49949 6.49949C3.84719 9.15179 2.35714 12.7491 2.35714 16.5C2.35714 20.2509 3.84719 23.8482 6.49949 26.5005C9.15179 29.1528 12.7491 30.6429 16.5 30.6429ZM16.5 33C12.1239 33 7.92709 31.2616 4.83274 28.1673C1.73839 25.0729 0 20.8761 0 16.5C0 12.1239 1.73839 7.92709 4.83274 4.83274C7.92709 1.73839 12.1239 0 16.5 0C20.8761 0 25.0729 1.73839 28.1673 4.83274C31.2616 7.92709 33 12.1239 33 16.5C33 20.8761 31.2616 25.0729 28.1673 28.1673C25.0729 31.2616 20.8761 33 16.5 33Z"
                                  fill="#383C3E"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="ef-radio-box">
                          <div className="d-flex align-items-center justify-content-between position-relative">
                            <input type="radio" name="option-radio" />
                            <label>Option 3</label>
                            <button className="btn p-0">
                              <svg
                                width="33"
                                height="33"
                                viewBox="0 0 33 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.8162 16.5732L11.4779 13.1983C11.2628 12.9732 11.1438 12.6717 11.1465 12.3588C11.1492 12.0459 11.2734 11.7466 11.4922 11.5253C11.7111 11.3041 12.0072 11.1786 12.3167 11.1759C12.6262 11.1731 12.9244 11.2934 13.147 11.5108L16.4853 14.8857L19.8236 11.5108C19.9325 11.3968 20.0628 11.3059 20.2068 11.2434C20.3508 11.1808 20.5057 11.1479 20.6624 11.1465C20.8192 11.1452 20.9746 11.1753 21.1197 11.2354C21.2648 11.2954 21.3966 11.384 21.5074 11.496C21.6182 11.6081 21.7059 11.7413 21.7652 11.888C21.8246 12.0346 21.8545 12.1918 21.8531 12.3502C21.8517 12.5087 21.8192 12.6653 21.7573 12.8109C21.6954 12.9565 21.6055 13.0882 21.4928 13.1983L18.1545 16.5732L21.4928 19.948C21.6055 20.0581 21.6954 20.1898 21.7573 20.3354C21.8192 20.481 21.8517 20.6376 21.8531 20.7961C21.8545 20.9545 21.8246 21.1117 21.7652 21.2583C21.7059 21.405 21.6182 21.5382 21.5074 21.6503C21.3966 21.7623 21.2648 21.8509 21.1197 21.911C20.9746 21.971 20.8192 22.0012 20.6624 21.9998C20.5057 21.9984 20.3508 21.9655 20.2068 21.9029C20.0628 21.8404 19.9325 21.7495 19.8236 21.6355L16.4853 18.2606L13.147 21.6355C12.9244 21.8529 12.6262 21.9732 12.3167 21.9704C12.0072 21.9677 11.7111 21.8422 11.4922 21.621C11.2734 21.3997 11.1492 21.1004 11.1465 20.7875C11.1438 20.4746 11.2628 20.1731 11.4779 19.948L14.8162 16.5732Z"
                                  fill="#383C3E"
                                />
                                <path
                                  d="M16.5 30.6429C18.3573 30.6429 20.1963 30.277 21.9122 29.5663C23.6281 28.8556 25.1872 27.8138 26.5005 26.5005C27.8138 25.1872 28.8556 23.6281 29.5663 21.9122C30.277 20.1963 30.6429 18.3573 30.6429 16.5C30.6429 14.6427 30.277 12.8037 29.5663 11.0878C28.8556 9.37187 27.8138 7.81278 26.5005 6.49949C25.1872 5.1862 23.6281 4.14445 21.9122 3.4337C20.1963 2.72296 18.3573 2.35714 16.5 2.35714C12.7491 2.35714 9.15179 3.84719 6.49949 6.49949C3.84719 9.15179 2.35714 12.7491 2.35714 16.5C2.35714 20.2509 3.84719 23.8482 6.49949 26.5005C9.15179 29.1528 12.7491 30.6429 16.5 30.6429ZM16.5 33C12.1239 33 7.92709 31.2616 4.83274 28.1673C1.73839 25.0729 0 20.8761 0 16.5C0 12.1239 1.73839 7.92709 4.83274 4.83274C7.92709 1.73839 12.1239 0 16.5 0C20.8761 0 25.0729 1.73839 28.1673 4.83274C31.2616 7.92709 33 12.1239 33 16.5C33 20.8761 31.2616 25.0729 28.1673 28.1673C25.0729 31.2616 20.8761 33 16.5 33Z"
                                  fill="#383C3E"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="add-more-div">
                        <button className="btn p-0">+ Add option</button>
                      </div>
                      <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-5">
                        <button className="btn btn-primary-light">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M28 13.8114V15.0074C27.9984 17.8108 27.0906 20.5385 25.4121 22.7838C23.7336 25.0291 21.3743 26.6717 18.686 27.4665C15.9977 28.2614 13.1244 28.1659 10.4948 27.1944C7.86518 26.2229 5.62005 24.4274 4.09425 22.0756C2.56845 19.7239 1.84373 16.9419 2.02818 14.1446C2.21263 11.3474 3.29637 8.68466 5.11776 6.55364C6.93916 4.42261 9.40062 2.93744 12.135 2.31963C14.8695 1.70182 17.7303 1.98448 20.291 3.12544"
                              stroke="#317470"
                              stroke-width="2.3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M28.0006 4.6084L15.0006 17.6214L11.1006 13.7214"
                              stroke="#317470"
                              stroke-width="2.3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Save question
                        </button>
                        <button className="btn p-0">Delete question</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 order-1 order-sm-1 order-md-2">
                    <div className="ef-right-div">
                      <div className="efr-group mb-4">
                        <label>Question category</label>
                        <select className="form-control">
                          <option>Form</option>
                        </select>
                      </div>
                      <div className="efr-group mb-4">
                        <label>Response type</label>
                        <select className="form-control">
                          <option>Multiple choice</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row">
                  <div className="col-md-8 order-2 order-sm-2 order-md-1">
                    <div className="edit-form-div">
                      <div className="ef-group mb-4">
                        <label>Type question here</label>
                        <textarea rows="5" className="form-control">
                          This budget is raised on urgent basis for the jamaat
                          as requested. Please approve and move ahead with the
                          Surat Jamiat Taher scheme budget disbursement follow?
                        </textarea>
                      </div>
                      <div className="ef-group mb-4">
                        <label>Type long answer here</label>
                        <textarea rows="5" className="form-control">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Massa ullamcorper consequat pellentesque vel sem
                          sollicitudin. Ut turpis enim gravida orci id eget.
                          Massa, tincidunt cras aenean felis nisl. Mi diam velit
                          habitasse sodales velit. Blandit orci, lacus nunc
                          cras. Ornare condimentum sit rhoncus, quis. Malesuada
                          leo.
                        </textarea>
                      </div>

                      <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-5">
                        <button className="btn btn-primary-light">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M28 13.8114V15.0074C27.9984 17.8108 27.0906 20.5385 25.4121 22.7838C23.7336 25.0291 21.3743 26.6717 18.686 27.4665C15.9977 28.2614 13.1244 28.1659 10.4948 27.1944C7.86518 26.2229 5.62005 24.4274 4.09425 22.0756C2.56845 19.7239 1.84373 16.9419 2.02818 14.1446C2.21263 11.3474 3.29637 8.68466 5.11776 6.55364C6.93916 4.42261 9.40062 2.93744 12.135 2.31963C14.8695 1.70182 17.7303 1.98448 20.291 3.12544"
                              stroke="#317470"
                              stroke-width="2.3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M28.0006 4.6084L15.0006 17.6214L11.1006 13.7214"
                              stroke="#317470"
                              stroke-width="2.3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Save question
                        </button>
                        <button className="btn p-0">Delete question</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 order-1 order-sm-1 order-md-2">
                    <div className="ef-right-div">
                      <div className="efr-group mb-4">
                        <label>Question category</label>
                        <select className="form-control">
                          <option>Form</option>
                        </select>
                      </div>
                      <div className="efr-group mb-4">
                        <label>Response type</label>
                        <select className="form-control">
                          <option>Paragraph</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row">
                  <div className="col-md-4 order-1 order-sm-1 order-md-2">
                    <div className="ef-right-div">
                      <div className="efr-group mb-4">
                        <label>Question category</label>
                        <select className="form-control">
                          <option>Form</option>
                        </select>
                      </div>
                      <div className="efr-group mb-4">
                        <label>Response type</label>
                        <select className="form-control">
                          <option>File upload</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 order-2 order-sm-2 order-md-1">
                    <div className="edit-form-div">
                      <div className="ef-group mb-4">
                        <label>Type question here</label>
                        <textarea rows="5" className="form-control">
                          This budget is raised on urgent basis for the jamaat
                          as requested. Please approve and move ahead with the
                          Surat Jamiat Taher scheme budget disbursement follow?
                        </textarea>
                      </div>

                      <div className="specific-list">
                        <h6 className="mb-4">Allow only specific file types</h6>
                        <div className="row">
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Document</label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Presentation</label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Spreadsheet</label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Image</label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Video</label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-4 col-md-4">
                            <div className="custom-form-check mb-4">
                              <input
                                type="checkbox"
                                name="specification-check"
                              />
                              <label>Audio</label>
                            </div>
                          </div>
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
                            <select className="form-control">
                              <option>5</option>
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
                            <select className="form-control">
                              <option>5 MB</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="save-btn-div d-flex flex-wrap gap-3 align-items-center mt-4">
                      <button className="btn btn-primary-light">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28 13.8114V15.0074C27.9984 17.8108 27.0906 20.5385 25.4121 22.7838C23.7336 25.0291 21.3743 26.6717 18.686 27.4665C15.9977 28.2614 13.1244 28.1659 10.4948 27.1944C7.86518 26.2229 5.62005 24.4274 4.09425 22.0756C2.56845 19.7239 1.84373 16.9419 2.02818 14.1446C2.21263 11.3474 3.29637 8.68466 5.11776 6.55364C6.93916 4.42261 9.40062 2.93744 12.135 2.31963C14.8695 1.70182 17.7303 1.98448 20.291 3.12544"
                            stroke="#317470"
                            stroke-width="2.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M28.0006 4.6084L15.0006 17.6214L11.1006 13.7214"
                            stroke="#317470"
                            stroke-width="2.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Save question
                      </button>
                      <button className="btn p-0">Delete question</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="ap-btn">
                      <p className="color-light">
                        <b className="d-block"> Q.1</b>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley.
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="prv-btn d-flex justify-content-end">
                      <a
                        href="#"
                        className="btn d-flex flex-column justify-content-center p-0 textcolor2 align-items-center gap-1"
                      >
                        <svg
                          width="27"
                          height="34"
                          viewBox="0 0 27 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.3884 8.61013C26.0263 7.95921 26.3773 7.09475 26.3773 6.17519C26.3773 5.25563 26.0263 4.39117 25.3884 3.74024L22.7121 1.00911C22.0742 0.358182 21.2271 0 20.3259 0C19.4248 0 18.5777 0.358182 17.9415 1.00739L0 19.2591V26.8619H7.44694L25.3884 8.61013ZM20.3259 3.44405L23.004 6.17347L20.3209 8.90116L17.6445 6.17174L20.3259 3.44405ZM3.375 23.4178V20.6884L15.255 8.60324L17.9314 11.3344L6.05306 23.4178H3.375ZM0 30.3059H27V33.75H0V30.3059Z"
                            fill="#A99368"
                          />
                        </svg>

                        <span>Edit</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="ap-btn">
                      <p className="color-light">
                        <b className="d-block"> Q.2</b>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley.
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="prv-btn d-flex justify-content-end">
                      <a
                        href="#"
                        className="btn d-flex flex-column justify-content-center p-0 textcolor2 align-items-center gap-1"
                      >
                        <svg
                          width="27"
                          height="34"
                          viewBox="0 0 27 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.3884 8.61013C26.0263 7.95921 26.3773 7.09475 26.3773 6.17519C26.3773 5.25563 26.0263 4.39117 25.3884 3.74024L22.7121 1.00911C22.0742 0.358182 21.2271 0 20.3259 0C19.4248 0 18.5777 0.358182 17.9415 1.00739L0 19.2591V26.8619H7.44694L25.3884 8.61013ZM20.3259 3.44405L23.004 6.17347L20.3209 8.90116L17.6445 6.17174L20.3259 3.44405ZM3.375 23.4178V20.6884L15.255 8.60324L17.9314 11.3344L6.05306 23.4178H3.375ZM0 30.3059H27V33.75H0V30.3059Z"
                            fill="#A99368"
                          />
                        </svg>

                        <span>Edit</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="back-to-top-div d-flex justify-content-end pt-2">
              <a
                href="#Edit_Form_Top"
                className="btn btn-primary d-flex gap-3 align-items-center"
              >
                Go to top
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1V17M1 8L8 1L15 8"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormEdit;
