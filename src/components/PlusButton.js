import { ReactComponent as PlusIcon } from "../assets/ic-plus.svg";
import {Link} from 'react-router-dom';

function PlusButton(props) {
    return <>
        <Link to={props.link}>
            <button className="fixed bottom-4 right-4 p-2 y-2 rounded-full bg-secondary">
                <PlusIcon className="text-background fill-current" />
            </button>
        </Link>
    </>
}

export default PlusButton;