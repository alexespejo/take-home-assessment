import { FaRegHeart, FaHeart } from "react-icons/fa";
import IconButton from "../util-components/IconButton";

function FavoriteIcon({
 className = "",
 onClick = () => {},
}: {
 className: string;
 onClick: () => void;
}) {
 return (
  <IconButton className={className} toolTip="Favorite">
   <label className="swap btn btn-secondary btn-outline bg-transparent text-3xl rounded-r-none">
    <input type="checkbox" onClick={onClick} />
    <FaHeart className="swap-on" />
    <FaRegHeart className="swap-off" />
   </label>
  </IconButton>
 );
}

export default FavoriteIcon;
