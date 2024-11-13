import CardMatakuliah from "../../components/CardMatakuliah";
import Navigation from '../../components/Navigation';
import PlusButton from '../../components/PlusButton';

function Home() {
    return (
        <div className="container-box">
            <Navigation />
            <CardMatakuliah />
            <PlusButton link="/create-matakuliah" />
        </div>
    )
}

export default Home;