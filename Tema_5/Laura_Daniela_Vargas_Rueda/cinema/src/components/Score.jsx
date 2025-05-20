import React from "react";
import StarIcon from "@mui/icons-material/Star";

const Score = ({ score }) => {
  const formatScore = () => {
    return `${score.toFixed(1)}`;
  };

  return (
    <div className="score__box">
      <StarIcon className="star-icon" color="warning" fontSize="medium" />
      {formatScore()}
    </div>
  );
};

export default Score;
