import React from 'react'

const DefaultPrivatePieChartImage = () => {
    return (
        <div className="default-pie-chart-image">
            <img src={window.location.origin +"/img/privateVote.png"} alt="Pie Chart" 
             style={{ width: "500px", height: "400px" }} />
        </div>
    );
}
export default DefaultPrivatePieChartImage