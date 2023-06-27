import BMIConstants from './constants'

const ResultCardComponent = (props) => {
    let result, resultText;
    resultText = props.data;

    switch (true) {
        case resultText.includes('healthy'):
            result = BMIConstants.HEALTHY;
            break;
        case resultText.includes('underweight'):
            result = BMIConstants.UNDERWEIGHT;
            break;
        case resultText.includes('overweight'):
            result = BMIConstants.OVERWEIGHT;
            break;
        default:
            result = BMIConstants.OTHER;
            break;
    }

    return (
        <div className="col mt-2">
            <div className="card shadow" style={{ maxWidth: '25rem' }}>
                <div className="card-header">Result</div>
                <img src={result} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: resultText ? resultText : '' }}></p>
                </div>
            </div>
        </div>
    )
}

export default ResultCardComponent;