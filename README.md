# Food Reuse with Convex and React

This repository contains the code for a food management application called **Food Reuse**, which helps users track food inventory, manage expiry dates, and make informed decisions to reduce food wastage. Built using React for the frontend and Convex for backend data management, the app integrates with GitHub OAuth for secure authentication.

## Table of Contents

- [Inspiration](#inspiration)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Challenges](#challenges)
- [Contributing](#contributing)
- [License](#license)

## Inspiration

Food wastage is a significant issue, particularly at the household level. With many households facing challenges in managing their food inventory effectively, a large amount of edible food ends up being discarded. The **Food Reuse** app is designed to address this problem by providing users with tools to track their food items, receive expiration alerts, and plan meals efficiently to minimize waste.

## Features

- **Food Inventory Management:** Add, view, and manage food items with details like quantity and expiration date.
- **Expiration Notifications:** Get timely notifications for items that are approaching their expiration date.
- **Meal Planning:** Generate meal suggestions based on the available ingredients in your inventory.
- **Secure Authentication:** Use GitHub OAuth for secure and seamless user login.

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** Convex
- **Authentication:** GitHub OAuth
- **AI Integration:** ChatGroq model, @langchain/core

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VaishnaviMudaliar/food-reuse-convex-react.git
   cd food-reuse-expiry
2. Install the Convex client and server library
To get started, install the convex package which provides a convenient interface for working with Convex from a React app.

Navigate to your app directory and install convex.
npm install convex

3. Set up a Convex dev deployment
Next, run npx convex dev. This will prompt you to log in with GitHub, create a project, and save your production and deployment URLs.

It will also create a convex/ folder for you to write your backend API functions in. The dev command will then continue running to sync your functions with your dev deployment in the cloud.

npx convex dev

4. Start the app
Start the app, open http://localhost:5173/ in a browser, and see the list of tasks.


Start the app, open http://localhost:5173/ in a browser, and see the list of tasks.

npm run dev

