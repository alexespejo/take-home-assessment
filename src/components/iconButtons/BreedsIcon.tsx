import { FaDog } from "react-icons/fa";
import IconButton from "../util-components/IconButton";

function BreedsIcon({ className = "" }: { className: string }) {
 return (
  <IconButton className={className} toolTip="View  Sub-Breeds">
   <button
    className={`text-3xl btn btn-secondary btn-outline bg-white border-secondary text-secondary ${className}`}
   >
    <FaDog />
   </button>
  </IconButton>
 );
}

export default BreedsIcon;
