import React, { useRef } from "react";

const MainRoom = (props) => {
  const canvasRef = useRef(null);
  return <canvas ref={canvasRef} {...props} />;
};

export default MainRoom;
