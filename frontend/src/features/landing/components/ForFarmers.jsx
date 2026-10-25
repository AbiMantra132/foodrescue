import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { FARMER_STEPS } from '../data/landingData.js';

export function ForFarmers() {
  return (
    <section id="rescue" className="two-col-section bg-mint">
      <div className="content-wrap">
        <div className="two-col-grid">
          <div className="feature-image-wrapper">
            <img
              className="feature-image"
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
              alt="Farmer smiling outdoors checking feed availability on smartphone"
            />
          </div>

          <div>
            <span className="section-label">FOR FARMERS</span>
            <h2 className="section-title">Find nutritious, affordable feed</h2>
            <p className="section-desc">
              Source safe, high-nutrient food surplus for your farm — without spending hours calling around.
            </p>

            <div className="step-list">
              {FARMER_STEPS.map((step) => (
                <div key={step.num} className="step-item">
                  <span className="step-num">{step.num}</span>
                  <div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="#explore" variant="primary">
              Explore feed nearby
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
