'use client'

import { useState } from "react"

export default function Bmi() {

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);


  const handleHeightChange = (event) => {
    setHeight(event.target.value)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const calculateBMI = () => {
    const bmiInt = weight / Math.pow(height, 2);
    switch (true) {
      case bmiInt <= 18.5:
        alert("Underweight");
        break;
      case bmiInt > 18.5 && bmiInt <= 24.9:
        alert("Healthy Weight");
        break;
      case bmiInt >= 25.0 && bmiInt <= 29.9:
        alert("Overweight");
        break;
      case bmiInt >= 30.0:
        alert("Obesity");
        break;
      default:
        alert("Error");
    }

  }


  return (
    <>
      <form >
        <div className="offset-3 row mt-1 g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="Height" className="col-form-label">Height</label>
          </div>
          <div className="col-4">
            <input type="number" id="height" max={3} value={height} onChange={handleHeightChange}
              name="height" className="form-control" aria-labelledby="HeightHelpIn" />
          </div>
          <div className="col-auto">
            <span id="HeightHelpIn" className="form-text">
              Height Must be meters (m).
            </span>
          </div>
        </div>
        <div className="offset-3 row mt-1 g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="Weight" className="col-form-label">Weight</label>
          </div>
          <div className="col-4">
            <input type="number" id="weight" max={3} name="weight" value={weight} onChange={handleWeightChange}
              className="form-control" aria-labelledby="WeightHelpIn" />
          </div>
          <div className="col-auto">
            <span id="WeightHelpIn" className="form-text">
              Weight Must be Kilogram (Kg).
            </span>
          </div>
        </div>
        <div className="col-6 d-grid mt-3 mx-auto">
          <button className="btn btn-primary" type="button" onClick={calculateBMI} >Calculate My BMI</button>
        </div>
      </form>
    </>
  )
}