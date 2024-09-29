import { useState, useEffect } from "react";
import { getSecondWord } from "../lib/StringHelper";
import FavoriteIcon from "./iconButtons/FavoriteIcon";
import RedoIcon from "./iconButtons/RedoIcon";
// import BreedsIcon from "./iconButtons/BreedsIcon";
import CardBody from "./util-components/CardBody";
import CardImg from "./util-components/CardImg";
import CardControls from "./util-components/CardControls";

function DogoCard({
 dogoName,
 subBreeds,
 bFav,
}: {
 dogoName: string;
 subBreeds: string[];
 bFav: boolean;
}) {
 const [imgDogo, setImgDogo] = useState<string>("");
 const [loading, setLoading] = useState(true);

 const fetchData = async (mounted: boolean) => {
  try {
   const response = await fetch(
    `https://dog.ceo/api/breed/${await getSecondWord(dogoName)}/images/random`
   );

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   const result = await response.json();

   if (mounted) {
    setImgDogo(result.message);
    setLoading(false);
   }
  } catch (err: any) {
   if (mounted) {
    setLoading(false);
   }
  }
 };

 useEffect(() => {
  let isMounted = true; // Flag to track if the component is mounted

  fetchData(isMounted);
  return () => {
   isMounted = false;
  };
 }, [dogoName]);

 return (
  <>
   {loading ? (
    <p>Loading...</p>
   ) : (
    <CardBody>
     <CardImg imgDogo={imgDogo} dogoName={dogoName} />
     <CardControls>
      <FavoriteIcon dogoName={dogoName} className="join-item" bFav={bFav} />
      <RedoIcon className="join-item" onClick={() => fetchData(true)} />
      {/* {subBreeds.length > 0 ? (
       <BreedsIcon
        className="join-item"
        dogoName={dogoName}
        subBreeds={subBreeds}
       />
      ) : (
       ""
      )} */}
     </CardControls>
    </CardBody>
   )}
  </>
 );
}

export default DogoCard;
