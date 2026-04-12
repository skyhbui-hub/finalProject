import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero" style={{ backgroundImage: `url('/homeBackground.jpg')` }}>
        <div className="hero-overlay">
          <p className="hero-text">
            Search, discover, and save recipes you'll actually make. 
            Dishcovery puts thousands of dishes at your fingertips.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home