import React from "react";

const Dashboard = () => {
  return (
    <div className="w-screen flex justify-center h-screen">
      <video width="50%" autoplay controls poster="https://auth.acm.org/wp-content/uploads/2020/12/acm_git-724x1024.png">
        <source
          src="https://res.cloudinary.com/dvqpqydim/video/upload/v1735582554/lets-see-how-many-people-get-rick-rolled-720-publer.io_njchez.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Dashboard;
