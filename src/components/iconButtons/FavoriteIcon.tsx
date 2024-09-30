import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import IconButton from "../util-components/IconButton";
import {
 readFromLocalStorage,
 storageWriteDelete,
} from "../../lib/LocalStorage";

function FavoriteIcon({
 dogoName,
 className = "",
 bFav,
 func,
}: {
 dogoName: string;
 className: string;
 bFav: boolean;
 func: () => void;
}) {
 const [isFav, setIsFav] = useState<boolean>(true);

 const isInFav = () => {
  let lstFavs: string | null = readFromLocalStorage("favs");
  setIsFav(lstFavs !== null && lstFavs.split(";").includes(dogoName));
 };
 useEffect(() => {
  setIsFav(bFav);
  isInFav();
 }, []);
 return (
  <IconButton className={className} toolTip="Favorite">
   {/* weird conditional bug */}
   <button
    className="swap btn btn-secondary btn-outline bg-transparent text-3xl rounded-r-none"
    onClick={() => {
     storageWriteDelete(dogoName);
     func();
     isInFav();
    }}
   >
    {isFav || bFav ? <FaHeart className="" /> : <FaRegHeart className="" />}
   </button>
  </IconButton>
 );
}

export default FavoriteIcon;
