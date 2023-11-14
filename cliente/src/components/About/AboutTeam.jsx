import React, { useEffect } from "react";
import CardsAbout from "./CardsAbout";


const teamMembers = [
  {
    id: 1,
    name: "Mathias Avesani",
    image: "https://avatars.githubusercontent.com/u/106494323?s=400&u=2299fd5a95f170c7185252e686ef45213550a490&v=4",
    github: "https://github.com/AveMat81",
    linkedin: "https://www.linkedin.com/in/matias-avesani/",
    description: "FULLSTACK DEVELOPER",
  },
  {
    id: 3,
    name: "Santiago Ramirez",
    image: "https://avatars.githubusercontent.com/u/128662221?v=4",
    github: "https://github.com/SantiagoRC31",
    linkedin: "https://www.linkedin.com/in/santiago-ramirez-49b3b7271/",
    description: "FULLSTACK DEVELOPER",
  },
  {
    id: 4,
    name: "Lorenzo Santos",
    image: "https://avatars.githubusercontent.com/u/119063320?v=4",
    github: "https://github.com/AbareKiller100",
    linkedin: "https://www.linkedin.com/in/lorenzo-santos-34a109267/",
    description: "FULLSTACK DEVELOPER",
  },
  {
    id: 5,
    name: "Omar Sampayo",
    github: "https://github.com/Omarx32",
    linkedin: "https://www.linkedin.com/in/omarx32/",
    image: "https://avatars.githubusercontent.com/u/132229759?v=4",
    description: "FULLSTACK DEVELOPER",
  },
  {
    id: 6,
    name: "Giomar Mesa",
    image: "https://media.licdn.com/dms/image/D4E03AQH-m9ssNBpT7A/profile-displayphoto-shrink_400_400/0/1682653300306?e=1702512000&v=beta&t=Ir2ncCq1qZKfXnf1-EQ6GG202Xthuznc_LeVnaloBh8",
    github: "https://github.com/Giomy8",
    linkedin: "https://www.linkedin.com/in/giomar-andrea-mesa-molina-a595621bb/",
    description: "FULLSTACK DEVELOPER",
  },
  {
    id: 7,
    name: "Anthoaned Zavala",
    image: "https://avatars.githubusercontent.com/u/94303392?v=4",
    github: "https://github.com/tyffcode",
    linkedin: "https://www.linkedin.com/in/anthozavala/",
    description: "FULLSTACK DEVELOPER",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aboutContainer">
      <h1 className="aboutTeam text-5xl text-center text-white my-8">TEAM MEMBERS</h1>
      <div className="flexContainer">
        <CardsAbout members={teamMembers} />
      </div>
    </div>
  );
};

export default About;