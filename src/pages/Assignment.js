import CardAssignment from "../components/CardAssignment";
import PlusButton from '../components/PlusButton';

function Assignment() {
  return (
    <div className="container">
      <CardAssignment />
      <PlusButton link="/create-assignment"/>
    </div>
  );
}

export default Assignment;
