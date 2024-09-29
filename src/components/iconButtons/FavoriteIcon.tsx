import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import IconButton from "../util-components/IconButton";
import {
 saveToLocalStorage,
 readFromLocalStorage,
 storageWriteDelete,
} from "../../lib/LocalStorage";

function FavoriteIcon({
 dogoName,
 className = "",
}: {
 dogoName: string;
 className: string;
}) {
 const [isFav, setIsFav] = useState<boolean>(false);

 const isInFav = () => {
  let lstFavs: string | null = readFromLocalStorage("favs");
  setIsFav(lstFavs !== null && lstFavs.split(";").includes(dogoName));
 };
 useEffect(() => {
  isInFav();
 }, []);
 return (
  <IconButton className={className} toolTip="Favorite">
   <label className="swap btn btn-secondary btn-outline bg-transparent text-3xl rounded-r-none">
    <input
     type="checkbox"
     onClick={() => {
      storageWriteDelete(dogoName);
      isInFav();
     }}
     checked={isFav}
    />
    <FaHeart className="swap-on" />
    <FaRegHeart className="swap-off" />
   </label>
  </IconButton>
 );
}

export default FavoriteIcon;
