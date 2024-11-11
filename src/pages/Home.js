import PlusButton from '../components/PlusButton';

function Home() {
    return (
        <>
            <h1 className="text-subtitle1 text-onBackground">Home</h1>
            <PlusButton link="/create-time" />
        </>
    )
}

export default Home;