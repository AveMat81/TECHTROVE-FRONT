import React from "react";
import CardAbout from "./CardAbout";


const CardsAbout = ({ members }) => {
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center items-center">
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