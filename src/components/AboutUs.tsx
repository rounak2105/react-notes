import type React from "react"
import Footer from "./Footer"
import flashLogo from "../assets/flash.svg"


const AboutUs: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Header Section */}
          <div className="text-center mb-5">
            <img
              src={flashLogo}
              alt="Logo"
              width="40"
              height="30"
              className="mb-3"
            />
            <h2 className="display-6 mb-2">FlashNotes</h2>
            <p className="text-muted">Keep your notes quick and shareable with FlashNotes!</p>
          </div>

          {/* Main Content */}
          <div className="row g-4">
            <div className="col-12">
              <h5 className="fw-bold text-primary mb-3">Our Mission</h5>
              <p className="text-muted">
                FlashNotes was created to provide a simple, fast, and efficient way to take and access notes from
                anywhere. Our mission is to help you capture your thoughts in a flash and access them whenever you need.
              </p>
            </div>

            <div className="col-12">
              <h5 className="fw-bold text-primary mb-3">What Makes Us Different</h5>
              <p className="text-muted">
                Unlike traditional note-taking apps, FlashNotes uses a unique ID system that allows you to access your
                notes from any device without creating an account. Just remember your FlashID, and your notes are always
                available.
              </p>
            </div>

            <div className="col-12">
              <h5 className="fw-bold text-primary mb-3">Our Features</h5>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                <div className="col">
                  <div className="p-3 border rounded bg-light">
                    Quick note creation without account setup
                  </div>
                </div>
                <div className="col">
                  <div className="p-3 border rounded bg-light">
                    Access notes from any device using your FlashID
                  </div>
                </div>
                <div className="col">
                  <div className="p-3 border rounded bg-light">
                    Simple and intuitive interface
                  </div>
                </div>
                <div className="col">
                  <div className="p-3 border rounded bg-light">
                    Real-time updates & secure storage
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <h5 className="fw-bold text-primary mb-3">Our Team</h5>
              <p className="text-muted">
                FlashNotes was developed by a small team of developers passionate about creating simple, effective tools
                that make everyday tasks easier. We believe in minimalist design and maximum functionality.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AboutUs

