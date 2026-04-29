import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero" style={{ backgroundImage: `url('/homeBackground.jpg')` }}>
        <div className="hero-overlay">
          <p className="hero-text">
          Stop overpaying for groceries. Compare prices across stores near you and start saving today.
          </p>
        </div>
      </div>

      <section>
        <h2>
          Description
        </h2>
        <p className='pb-6'>
          Our grocery price comparison tool makes it simple to find the best deals near you. Powered by the Kroger API, our platform pulls real-time pricing data
          from Kroger's family of banner stores in your area, giving you a side-by-side comparison of prices across multiple locations. Filter results by store, price,
          or distance to find the option that works best for you. Create a free account to save and revisit your shopping lists anytime, or use the site as a guest with
          a temporary session list.
        </p>
      </section>

      <section>
        <h2>
          Purpose
        </h2>
        <p className='pb-6'>
          We've all been there, you buy groceries one day only to find the same items cheaper at a different store a few days later. That frustration is exactly what we set
          out to fix. Our goal is to take the guesswork out of grocery shopping by putting price comparisons from multiple stores right at your fingertips. Whether you're
          trying to stretch your budget, save time, or just avoid buyer's remorse at the checkout line, our platform helps you make smarter, more informed decisions every time you shop.
        </p>
      </section>

    </div>
  )
}

export default Home