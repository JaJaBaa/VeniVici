# Mars Rover Photo Explorer (Veni Vici)

A web application that allows users to discover random photos taken by NASA's Mars Rovers (Curiosity, Opportunity, and Spirit). Users can click through random images and add camera types to a ban list to customize their exploration experience.

## Project Overview

This project is built using React and the NASA Mars Rover Photos API. It demonstrates the following features:

- Random photo fetching from the NASA Mars Rover Photos API
- Displaying detailed information about each photo (rover name, camera, earth date, sol, etc.)
- Ban list functionality to filter out specific camera types
- Viewing history of previously seen photos

## Required Features Implemented

- ✅ Button that creates a new API fetch request on click and displays attributes and images
- ✅ Consistent attribute display across API calls
- ✅ Only one item/data is viewable at a time with at least one image displayed per API call
- ✅ Results appear random to the user
- ✅ Clickable attribute values (camera names) can be added to a ban list
- ✅ Ban list prevents further images with those attribute values from being displayed

## Stretch Features Implemented

- ✅ Users can see a stored history of previously displayed results from the current session

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Information

This project uses the [NASA Mars Rover Photos API](https://api.nasa.gov/), which provides access to images collected by NASA's Curiosity, Opportunity, and Spirit rovers on Mars.

By default, the app uses NASA's DEMO_KEY for API authentication. For increased rate limits, you can obtain your own API key from NASA at [https://api.nasa.gov/](https://api.nasa.gov/) and replace the API_KEY constant in the App.jsx file.

## Technologies Used

- React
- Vite
- NASA Mars Rover Photos API
- CSS for styling

## License

This project is open source and available under the MIT License.
