import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [imageError, setImageError] = useState(false);

  // NASA API key - using user's personal API key
  const API_KEY = "i9iq4BtegDTMmSSkCXuVi7ecIxh45mYXRhVceRKG";

  // Function to fetch a random Mars rover photo
  const fetchRandomPhoto = async () => {
    setLoading(true);
    setError(null);
    setImageError(false);

    try {
      // Choose a random rover
      const rovers = ["curiosity", "opportunity", "spirit"];
      const randomRover = rovers[Math.floor(Math.random() * rovers.length)];

      // Generate a random sol (Martian day) between 0 and a reasonable max
      // Using different ranges for different rovers based on their mission durations
      let maxSol;
      switch (randomRover) {
        case "curiosity":
          maxSol = 3000; // Curiosity has been active longer
          break;
        case "opportunity":
          maxSol = 5000;
          break;
        case "spirit":
          maxSol = 2000;
          break;
        default:
          maxSol = 1000;
      }

      const randomSol = Math.floor(Math.random() * maxSol);

      // Fetch photos for this rover and sol
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${randomRover}/photos?sol=${randomSol}&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`NASA API returned ${response.status}`);
      }

      const data = await response.json();

      // If no photos found, try again
      if (!data.photos || data.photos.length === 0) {
        setLoading(false);
        fetchRandomPhoto(); // Try again with different parameters
        return;
      }

      // Select a random photo from the results
      let validPhotos = data.photos;

      // Filter out photos based on ban list (camera name ban)
      if (banList.length > 0) {
        validPhotos = validPhotos.filter(
          (photo) => !banList.includes(photo.camera.name)
        );
      }

      // If no valid photos after filtering, try again
      if (validPhotos.length === 0) {
        setLoading(false);
        fetchRandomPhoto();
        return;
      }

      const randomIndex = Math.floor(Math.random() * validPhotos.length);
      const selectedPhoto = validPhotos[randomIndex];

      setPhoto(selectedPhoto);
      setHistory((prev) => [...prev, selectedPhoto]);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Add or remove a camera from the ban list
  const toggleBan = (cameraName) => {
    if (banList.includes(cameraName)) {
      setBanList(banList.filter((item) => item !== cameraName));
    } else {
      setBanList([...banList, cameraName]);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="container">
      <h1>Mars Rover Photo Explorer</h1>
      <p className="description">
        Discover random photos taken by NASA's Mars Rovers. Click attributes to
        add them to your ban list.
      </p>

      <div className="actions">
        <button
          onClick={fetchRandomPhoto}
          disabled={loading}
          className="discover-btn"
        >
          {loading ? "Loading..." : "Discover Mars Photo"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="ban-list-container">
        <h2>Ban List</h2>
        {banList.length === 0 ? (
          <p>No cameras banned. Click on a camera name to ban it.</p>
        ) : (
          <ul className="ban-list">
            {banList.map((camera, index) => (
              <li
                key={index}
                onClick={() => toggleBan(camera)}
                className="ban-item"
              >
                {camera} <span className="remove-icon">×</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {photo && (
        <div className="photo-container">
          <h2>Mars Photo</h2>
          <div className="photo-details">
            <div className="photo-image">
              <img src={photo.img_src} alt={`Mars by ${photo.rover.name}`} />
            </div>
            <div className="photo-info">
              <p>
                <strong>Rover:</strong> {photo.rover.name}
              </p>
              <p>
                <strong>Camera:</strong>
                <span
                  onClick={() => toggleBan(photo.camera.name)}
                  className={`clickable ${
                    banList.includes(photo.camera.name) ? "banned" : ""
                  }`}
                >
                  {photo.camera.name} ({photo.camera.full_name})
                </span>
              </p>
              <p>
                <strong>Earth Date:</strong> {formatDate(photo.earth_date)}
              </p>
              <p>
                <strong>Sol:</strong> {photo.sol}
              </p>
              <p>
                <strong>Rover Status:</strong> {photo.rover.status}
              </p>
              <p>
                <strong>Rover Launch Date:</strong>{" "}
                {formatDate(photo.rover.launch_date)}
              </p>
              <p>
                <strong>Rover Landing Date:</strong>{" "}
                {formatDate(photo.rover.landing_date)}
              </p>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-container">
          <h2>Viewing History</h2>
          <div className="history-grid">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <img
                  src={item.img_src}
                  alt={`History item ${index + 1}`}
                  className="history-img"
                />
                <div className="history-info">
                  <small>
                    {item.rover.name}, {item.camera.name}, Sol {item.sol}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
