import { FaDice } from "react-icons/fa";
import IconButton from "../util-components/IconButton";

function RedoIcon({
 className = "",
 imgExist,
 onClick = () => {},
}: {
 className: string;
 imgExist: boolean;
 onClick: () => void;
}) {
 return (
  <IconButton className={className} toolTip="Change Photo">
   <button
    className={`text-3xl btn btn-secondary btn-outline bg-white border-secondary text-secondary ${className}`}
    onClick={onClick}
    disabled={!imgExist}
   >
    <FaDice />
   </button>
  </IconButton>
 );
}

export default RedoIcon;
