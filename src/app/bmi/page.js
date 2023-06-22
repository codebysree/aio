'use client'

import { useState, useEffect } from "react"

export default function Bmi() {

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [resultText, setresultText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isClicked) {
      intervalId = setInterval(() => {
        console.log('progress', progress)
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 25;
          return newProgress > 100 ? 100 : newProgress;
        });
        console.log('Interval is running...');
      }, 1000); // Interval duration: 1 second
    }

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts or when isClicked changes to false
    };
  }, [isClicked]);

  const handleHeightChange = (event) => {
    setHeight(event.target.value)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const calculateBMI = async () => {
    setIsClicked(true);
    const bmiInt = parseFloat((weight / Math.pow(height, 2))).toFixed(1);
    console.log('bmiInt', bmiInt)
    await new Promise(res => setTimeout(res, 5000))
    const commonClass = "badge fs-2 justify-content-center mt-4";
    switch (true) {
      case bmiInt <= 18.5:
        setresultText(`<span class="${commonClass} text-bg-warning">You are Underweight</span>`)
        break;
      case bmiInt > 18.5 && bmiInt <= 24.9:
        setresultText(`<span class="${commonClass} text-bg-success">Healthy Weight</span>`)
        break;
      case bmiInt >= 25.0 && bmiInt <= 29.9:
        setresultText(`<span class="${commonClass} text-bg-warning">You are Overweight</span>`);
        break;
      case bmiInt >= 30.0:
        setresultText(`<span class="${commonClass} text-bg-danger">You are in Obese Category ~ Obesity</span>`)
        break;
      default:
        setresultText('<span class="badge text-bg-light">Not Found</span>')
    }
    setIsClicked(false);
  }


  return (
    <>
      <div className="card col-9 mb-3 mt-5 offset-2 shadow">
        <div className="card-header">Header</div>
        <div className="card-body">
          {/* <h5 class="card-title">Light card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

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
                <input type="number" id="weight" max={200} name="weight" value={weight} onChange={handleWeightChange}
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
          {(isClicked) ? (
            <>
              <div className="progress mt-5" role="progressbar" aria-label="Animated striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ height: '10px' }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{progress}%</div>
              </div>
            </>
          ) : ''}
          <div className="offset-3" dangerouslySetInnerHTML={{ __html: resultText ? resultText : '' }}>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          2 days ago
        </div>
      </div >
    </>
  )
}