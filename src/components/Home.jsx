import {React,useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const tagLines = [
    "Hungry? Grab a Bite!",
    "Delicious Food Awaits!",
    "Satisfy Your Cravings!",
    "Taste the Flavors of Joy!",
    "Food that Speaks Delicious!",
    "Your Food Adventure Begins Here!",
    "Savor the Moment, Savor the Food!",
    "Every Bite, a Celebration!"
    // Add more tag lines here
  ];
  const [currentTagLineIndex, setCurrentTagLineIndex] = useState(0);
  const [displayedTagLine, setDisplayedTagLine] = useState(tagLines[0]);
  const displayNextTagLine = () => {
    setTimeout(() => {
      const newIndex = (currentTagLineIndex + 1) % tagLines.length;
      setCurrentTagLineIndex(newIndex);
      setDisplayedTagLine(tagLines[newIndex]);
    }, 3000); // Adjust the delay (in milliseconds) as needed
  };
  useEffect(() => {
    displayNextTagLine();
  }, [displayNextTagLine]);
  return (
    <>
        <div className="section">
        <div className="banner"></div>
        <div className="info">
            <img src={require("../images/ideogram.jpeg")} alt="" />
            <h1><p>{displayedTagLine}</p></h1>
            <h2>Place your order now!</h2>
            <button type="submit"><NavLink to={'/login'}>Login</NavLink></button>
        </div>
        </div>
    </>
  )
}

export default Home
