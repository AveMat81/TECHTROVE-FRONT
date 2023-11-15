import React from "react";
import CardAbout from "./CardAbout";


const CardsAbout = ({ members }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 justify-items-center items-center">
      {members.map((member) => (
        <CardAbout
          key={member.id}
          name={member.name}
          description={member.description}
          github={member.github}
          linkedin={member.linkedin}
          image={member.image}
        />
      ))}
    </div>
  );
};

export default CardsAbout;