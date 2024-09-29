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
}: {
 dogoName: string;
 className: string;
 bFav: boolean;
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
   <label className="swap btn btn-secondary btn-outline bg-transparent text-3xl rounded-r-none">
    <input
     type="checkbox"
     checked={isFav || bFav}
     onChange={() => {
      storageWriteDelete(dogoName);
      isInFav();
     }}
    />
    <FaHeart className="swap-on" />
    <FaRegHeart className="swap-off" />
   </label>
  </IconButton>
 );
}

export default FavoriteIcon;
