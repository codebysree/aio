'use client'

import { useState, useEffect } from "react"

import ResultCardComponent from './resultcard';
import wait from '../util'

export default function Bmi() {

  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState('m');
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [resultText, setresultText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isClicked) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 50;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000); // Interval duration: 1 second
    }

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts or when isClicked changes to false
      setProgress(0);
    };
  }, [isClicked]);

  const handleHeightChange = (event) => {
    setHeight(event.target.value)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const reset = () => {
    setHeight(0);
    setWeight(0);
    setresultText('');
    setIsClicked(false);
    setProgress(0);
    setWeightUnit('kg');
    setHeightUnit('m')

  }

  const changeHeightUnit = (event) => {
    setHeightUnit(event.target.value)
  }

  const changeWeightUnit = (event) => {
    setWeightUnit(event.target.value)
  }

  const calculateBMI = async () => {
    setIsClicked(true);
    let weightInKg, heightInMet;

    if (heightUnit == 'cm') {
      heightInMet = height / 100;
    }
    else if (heightUnit == 'ft') {
      heightInMet = (height / 3.281)
    }
    else if (heightUnit == 'in') {
      heightInMet = (height / 39.37)
    }
    else {
      heightInMet = height
    }

    if (weightUnit == 'lb') {
      weightInKg = (weight / 2.205)
    }
    else {
      weightInKg = weight
    }
    console.log(weightInKg, weightUnit, '-------', heightInMet, heightUnit);
    const bmiInt = parseFloat((weightInKg / Math.pow(heightInMet, 2))).toFixed(1);
    console.log(bmiInt);
    await wait(3000);
    const commonClass = "badge fs-6 text-start text-wrap";
    let idealWeight, weightDifference;

    switch (true) {
      case bmiInt <= 18.5:
        idealWeight = 18.5 * heightInMet * heightInMet;
        weightDifference = (idealWeight - weightInKg).toFixed(2)
        setresultText(`<span class="${commonClass} text-bg-warning">You are underweight. You may need to gain ${weightDifference} kg.</span>`)
        break;
      case bmiInt > 18.5 && bmiInt < 24.9:
        setresultText(`<span class="${commonClass} text-bg-success">You have a healthy weight. Maintain your current weight.</span>`)
        break;
      case bmiInt >= 24.9:
        idealWeight = 24.9 * heightInMet * heightInMet;
        weightDifference = (idealWeight - weightInKg).toFixed(2)
        setresultText(`<span class="${commonClass} text-bg-warning">You are overweight. You may need to lose ${weightDifference} kg.</span>`);
        break;
      default:
        setresultText('<span class="badge text-bg-light">Not Found</span>')
    }
    setIsClicked(false);
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="card mt-2 shadow">
              <div className="card-header">Calculate BMI</div>
              <div className="card-body">
                <div className="row">
                  <form id="bmi">

                    <div className="row mb-3">
                      <label htmlFor="height" className="col-sm-2 col-form-label">Height</label>
                      <div className="col-sm-7">
                        <input type="number" id="height" min={0} max={3} value={height} onChange={handleHeightChange}
                          name="height" className="form-control" aria-labelledby="HeightHelpIn" />
                      </div>
                      <div className="col-sm-3">
                        <select className="form-select" value={heightUnit} aria-label="form-select-sm example" onChange={changeHeightUnit}>
                          <option value="cm">Centimeters (cm) </option>
                          <option value="m">Meter (m)</option>
                          <option value="ft">Foot</option>
                          <option value="in">Inch</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Weight" className="col-sm-2 col-form-label">Weight</label>
                      <div className="col-sm-7">
                        <input type="number" id="weight" min={0} max={200} name="weight" value={weight} onChange={handleWeightChange}
                          className="form-control" aria-labelledby="WeightHelpIn" />
                      </div>
                      <div className="col-sm-3">
                        <select className="form-select" value={weightUnit} aria-label="form-select-sm example" onChange={changeWeightUnit}>
                          <option value="kg">Kilogram (kg) </option>
                          <option value="lb">Pound (p)</option>
                        </select>
                      </div>
                    </div>

                    <div className="">
                      <button className="btn btn-outline-primary btn-sm float-end" type="button" onClick={calculateBMI} >Calculate BMI</button>
                      <button className="btn btn-link btn-sm float-start" type="button" onClick={reset} >Reset</button>
                    </div>
                  </form>
                </div>

                {(isClicked) ? (
                  <>
                    <div className="progress  mt-4" role="progressbar" aria-label="Animated striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ height: '10px' }}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}></div>
                    </div>
                  </>
                ) : ''}
              </div>

              <div className="card-footer text-body-secondary">
                2 days ago
              </div>
            </div >
          </div>

          {(resultText) ? <ResultCardComponent data={resultText}></ResultCardComponent> : ''}

        </div>
      </div >

    </>
  )
}