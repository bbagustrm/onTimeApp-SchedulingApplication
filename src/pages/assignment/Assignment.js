import React from "react";
import CardAssignment from "../../components/CardAssignment";
import Navigation from '../../components/Navigation';
import PlusButton from '../../components/PlusButton';

function Assignment() {
    return (
    <div className="container-box">
        <Navigation />

        <CardAssignment />
        <PlusButton link="/create-assignment" />
    </div>
  );
}

export default Assignment;
