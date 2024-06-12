import React from "react";// Import your pie chart image here

const DefaultPieChartImage = () => {
    return (
        <div className="default-pie-chart-image">
            <img src={window.location.origin +"/img/publicVote.png"} alt="Pie Chart" 
             style={{ width: "500px", height: "400px" }} />
        </div>
    );
};

export default DefaultPieChartImage;
