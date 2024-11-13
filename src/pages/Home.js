import PlusButton from '../components/PlusButton';
import Navigation from '../components/Navigation';

function Home() {
    return (
        <div className='container-box'>
            <Navigation/>
            <h1 className="text-subtitle1 text-onBackground">Home</h1>
            <PlusButton link="/create-time" />
        </div>
    )
}

export default Home;