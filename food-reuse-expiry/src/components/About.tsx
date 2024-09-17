import React from 'react';
import './About.css'; 

const About: React.FC = () => {
  return (
    <div className="aboutPage">
      <h1>About PantryGuardian</h1>
      <h2>Your food's best friend against waste</h2>
      <p>
        This application has been developed using Convex, Langchain, and Streamlit.
      </p>
      <p>
        PantryGuardian is intended to help reduce food wastage at the household level.
        The features of this application include:
      </p>
      <ul>
        <li>
          Users can enter food items with expiration dates. This helps track the expiration of the items and notifies users before they expire.
        </li>
        <li>
          Recipes are suggested based on the items in your pantry, considering the expiration dates to reduce food wastage.
        </li>
        <li>
          A curated meal plan is provided based on the food inventory to help users use their food efficiently and minimize waste.
        </li>
      </ul>
    </div>
  );
};

export default About;
