import Link from 'next/link'
import styles from './page.module.css'

const Cards = () => {
  return (
    <div className={styles.flexContainer}>
      {
        modules.map((item) => (
          <div className="card shadow" key={item.title}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.desciption}</p>
              <Link href={item.route} className="btn btn-primary">{item.buttonText}</Link>
            </div>
          </div>
        ))
      }
      
    </div>
  )
}

const modules = [
  {
    title: 'BMI',
    desciption: 'BMI is a number calculated from weight and height.',
    route: '/bmi',
    buttonText: 'Calculate BMI'
  },
  {
    title: 'Dictionary',
    desciption: 'Definitions, phonetics, pronounciations, parts of speech etc.',
    route: '/dictionary',
    buttonText: 'Get Meaning'
  },
  {
    title: 'Weather Info',
    desciption: 'Get Weather information on your current location',
    route: '/weather',
    buttonText: 'Fetch Weather'
  },
  {
    title: 'Json Formatter',
    desciption: 'Format your data',
    route: '/formatter',
    buttonText: 'Data Formatter'
  }
];

export default Cards;