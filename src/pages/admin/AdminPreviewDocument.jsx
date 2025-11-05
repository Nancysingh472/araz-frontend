import React from 'react';

const AdminPreviewDocument = () => {
  return (
    <div className="preview-document-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5>
                    <a
                      href="#"
                      className="text-decoration-underline text-white text-regular"
                    >
                      Document
                    </a>
                    <span className="text-regular">></span> Preview Document
                  </h5>
                </div>
                <div className="col-sm-4">
                  <div className="table-filter-div">
                    <button className="btn btn-primary">Exit preview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pre-document-card">
            <div className="pre-doc-title">
              <h5 className="textcolor2">APPROVAL DOCUMENT</h5>
            </div>
            <div className="doc-box">
              <div className="doc-box-head">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="doc-box-text">
                      <h5 className="text-primary font-22">
                        Approval Document
                      </h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="doc-box-logo text-end">
                      <img
                        src="/assets/images/document-logo.png"
                        atl="img"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="doc-box-body">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages,
                </p>
                <p>
                  لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة
                  والتنضيد. كان هو النص الوهمي القياسي في الصناعة منذ القرن
                  الخامس عشر الميلادي ، عندما أخذت طابعة غير معروفة لوحًا من
                  النوع وتدافعت عليه لعمل كتاب عينة. لقد صمد ليس فقط لخمسة قرون
                  ، ولكن أيضًا القفزة في التنضيد الإلكتروني ، وظل دون تغيير
                  جوهري. تم نشره في الستينيات بإصدار أوراق التي تحتوي على مقاطع
                </p>

                <div className="doc-box-sign">
                  <img
                    src="/assets/images/doc-sign.png"
                    alt="img"
                    className="img-fluid"
                  />
                  <p>
                    Huzaifa Bhaisab
                    <br />
                    24th August 2022
                  </p>
                </div>
              </div>
              <div className="doc-box-footer">
                <p className="text-center">
                  <b>Reg. Address:</b> Shop No.8, Dwarkadas Cross Lane, 32, Modi
                  St, Borabazar Precinct, Ballard Estate, Fort, Mumbai,
                  Maharashtra 400001
                  <br />
                  <b>Contact:</b> 022 4074 5252
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewDocument;
