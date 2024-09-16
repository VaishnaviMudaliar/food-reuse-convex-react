import React from 'react';
import './welcomPage.css'; // Assuming you have a specific CSS file for this component
import MealPlanImage from '../assets/meal_plan.png';
import RecipesImage from '../assets/recipes.png';
import FoodEntryForm from './EntertheFoodItems';

interface WelcomePageProps {
  title: string;
  recipeLink: string;
  homeLink: string;
  aboutLink: string;
  trackExpiryLink: string;
  loginLink: string;
  signupLink: string;
}

const handleRecipe = () => {
  return (
    <FoodEntryForm userId=''/>
  )
}


const WelcomePage: React.FC<WelcomePageProps> = ({
  title,
  recipeLink,
  homeLink,
  aboutLink,
  trackExpiryLink,
  loginLink,
  signupLink,
}) => {
  return (
    <div className="welcomePage">
      <header className="welcomePage-header">
        {/* <nav className="navbar">
          <ul className="navbar-menu">
            <li><a href={homeLink}>Home</a></li>
            <li><a href={aboutLink}>About</a></li>
            <li><a href={trackExpiryLink}>Track Expiry</a></li>
          </ul>
          <ul className="navbar-auth">
            <li><a href={loginLink}>Login</a></li>
            <li><a href={signupLink}>Signup</a></li>
          </ul>
        </nav> */}
        <div className="content">
          <div className="text-content">
            <h1>{title}</h1>
            <div className='page-buttons'>
            <a className="enter-food-item" href={recipeLink}>
              <img className  = 'button-image' src={RecipesImage} alt="icon1" />Enter Food Items</a>
            <a className="generate-meal-plans" href={recipeLink}>
              <img  className  = 'button-image' src={MealPlanImage} alt="icon2"/>Generate Meal Plans</a>
            </div>
            
          </div>
          
        </div>
      </header>
    </div>
  );
};

export default WelcomePage;
