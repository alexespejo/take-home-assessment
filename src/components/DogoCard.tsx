import { useState, useEffect } from "react";
import { getFirstWord, getSecondWord } from "../lib/StringHelper";
import { filterImagesByBreed, getRandomValue } from "../lib/ObjectHelper";
import FavoriteIcon from "./iconButtons/FavoriteIcon";
import RedoIcon from "./iconButtons/RedoIcon";
import GallaryIcon from "./iconButtons/GallaryIcon";
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
 const [loading, setLoading] = useState<boolean>(true);
 const [lstDogoImgs, setLstDogoImgs] = useState<string[]>([]);
 const fetchImages = async (mounted: boolean) => {
  try {
   const response = await fetch(
    `https://dog.ceo/api/breed/${getSecondWord(dogoName)}/images`
   );
   if (!response.ok) {
    throw new Error("Network response was not ok");
   }
   const result = await response.json();
   if (mounted) {
    let filteredImgs: string[] = filterImagesByBreed(
     result.message,
     getFirstWord(dogoName)
    );

    setLstDogoImgs(filteredImgs);
    setImgDogo(getRandomValue(filteredImgs));
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

  fetchImages(isMounted);
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
      <RedoIcon
       className="join-item"
       imgExist={imgDogo !== undefined}
       onClick={() => setImgDogo(getRandomValue(lstDogoImgs))}
      />
      <GallaryIcon
       className="join-item"
       dogoName={dogoName}
       imgExist={imgDogo !== undefined}
      >
       test
      </GallaryIcon>
     </CardControls>
    </CardBody>
   )}
  </>
 );
}

export default DogoCard;
