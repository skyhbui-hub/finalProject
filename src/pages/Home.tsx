import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero" style={{ backgroundImage: `url('/homeBackground.jpg')` }}>
        <div className="hero-overlay">
          <p className="hero-text">
          Stop worrying about what to make. Let <b>GrocerEase</b> choose what you need. Affordable, reliable ingredients and healthy, easy recipes is a search away.
          </p>
        </div>
      </div>

      <section>
        <h2>
          Description
        </h2>
        <p className='pb-6'>
          Our grocery & recipe search tool makes it simple to decide the best ingredients to feed you and your loved ones. Powered by the fatSecret Platform API and MealsDB, our platform 
          allows you to search for the best ingredients, their nutritional value, and where to purchase them. Additionally, this platform carries ease of mind when looking for recipes.
          Specifically, it offers various recipes from around the world, recipe instructions, and relevantly, the ingredients to make it. Worry no more. This week's meal is powered by GrocerEase.
        </p>
      </section>

      <section>
        <h2>
          Purpose
        </h2>
        <p className='pb-6'>
          We've all been there, you can't figure out what to make that is best for you and your family. The problem is that it becomes easy to choose fast food over a homecooked meal when you don't know what to make.
          That frustration is exactly what we set out to fix. Our goal is to take the guesswork out of grocery shopping by putting nutritional from multiple stores right at your fingertips. Whether you're
          trying to stretch your budget, save time, or just avoid buyer's remorse at the checkout line, our platform helps you make smarter, more informed decisions every time you shop.
        </p>
      </section>

    </div>
  )
}

export default Home