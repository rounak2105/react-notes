import type React from "react"
import Footer from "./Footer"
import flashLogo from "../assets/flash.svg"

const Help: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Header */}
          <div className="text-center mb-5">
            <img
              src={flashLogo}
              alt="Logo"
              width="40"
              height="30"
              className="mb-3"
            />
            <h2 className="display-6 mb-2">Help Center</h2>
            <p className="text-muted">Find answers to common questions about FlashNotes</p>
          </div>

          {/* FAQ Accordion */}
          <div className="accordion accordion-flush" id="helpAccordion">
            {/* Getting Started */}
            <div className="accordion-item mb-3 border rounded">
              <h2 className="accordion-header">
                <button
                  className="accordion-button rounded-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                >
                  How do I get started with FlashNotes?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <ol className="ps-4">
                    <li className="mb-2">On the home page, click the "Go" button without entering anything to generate a random FlashID</li>
                    <li className="mb-2">Or enter a custom FlashID of your choice and click "Go"</li>
                    <li className="mb-2">Start adding notes in the text area and click "Add" to save them</li>
                    <li className="text-primary"><strong>Important:</strong> Remember your FlashID to access your notes later!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Access Notes */}
            <div className="accordion-item mb-3 border rounded">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed rounded-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  How do I access my notes later?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <ol className="ps-4">
                    <li className="mb-2">Return to FlashNotes</li>
                    <li className="mb-2">Enter your FlashID in the input field</li>
                    <li className="mb-2">Click "Go" to view all your saved notes</li>
                  </ol>
                  <p className="text-muted mt-3">Your notes are stored on our servers and can be accessed from any device using your FlashID.</p>
                </div>
              </div>
            </div>

            {/* Refresh Notes */}
            <div className="accordion-item mb-3 border rounded">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed rounded-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  How do I refresh my notes?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <ol className="ps-4">
                    <li className="mb-2">Click on the flash icon next to your FlashID at the top of the notes page</li>
                    <li className="mb-2">Your notes will be refreshed from our server</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Lock the Note */}
            <div className="accordion-item mb-3 border rounded">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed rounded-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                >
                  What is the "Lock the Note" feature?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <p>
                    The "Lock the Note" feature (indicated by the lock icon) allows you to protect your notes from
                    unauthorized access.
                  </p>
                </div>
              </div>
            </div>

            {/* Delete Note */}
            <div className="accordion-item mb-3 border rounded">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed rounded-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                >
                  How do I delete a note?
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <ol className="ps-4">
                    <li className="mb-2">Find the note you want to delete in your list</li>
                    <li className="mb-2">Click on the delete icon (trash can) on the top of the note</li>
                    <li className="mb-2">The note will be removed forever</li>
                  </ol>
                  <p className="text-muted mt-3">
                    <em>Note: Deletion is permanent and cannot be undone.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-5 text-center py-4 border-top">
            <p className="text-muted mb-0">
              Need more help? Contact us at{" "}
              <a href="mailto:hello@flashnotes.xyz" className="text-primary fw-medium text-decoration-none">
                hello@flashnotes.xyz
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Help

