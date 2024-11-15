import React from "react";
import CardTime from "../../components/CardTime";
import PlusButton from '../../components/PlusButton';
import Navigation from '../../components/Navigation';

function Home() {
    return (
        <div className='container-box'>
            <Navigation/>
            <CardTime />
            <PlusButton link="/create-time" />
        </div>
    )
}

export default Home;