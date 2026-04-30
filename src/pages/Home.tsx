import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero" style={{ backgroundImage: `url('/homeBackground.jpg')` }}>
        <div className="hero-overlay">
          <p className="hero-text">
          Stop stressing about what to buy. Let <b>GrocerEase</b> do the searching for you. Thousands of branded products and their full nutritional info, all in one place.
          </p>
        </div>
      </div>

      <section>
        <h2>
          Description
        </h2>
        <p className='pb-6'>
        Our grocery search tool makes it simple to find and track the best ingredients for you and your loved ones. Powered by the USDA FoodData Central API, our platform 
        allows you to search for thousands of branded grocery products, view their full nutritional information, and build a personalized shopping list all in one place. 
        Whether you're tracking macros, planning meals, or just trying to eat better, GrocerEase takes the guesswork out of grocery shopping. Create an account to save your 
        list permanently, or use it as a guest for a quick session. This week's groceries, powered by GrocerEase.
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