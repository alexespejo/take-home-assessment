import { useState, useEffect } from "react";
import {
 capitalizeString,
 getFirstWord,
 getSecondWord,
} from "../lib/StringHelper";
import { filterImagesByBreed } from "../lib/ObjectHelper";

function GalleryModal({
 children,
 dogoName,
}: {
 children: React.ReactNode;
 dogoName: string;
}) {
 const [lstDogoImgs, setLstDogoImgs] = useState<string[]>([]);

 const fetchImages = async () => {
  try {
   const response = await fetch(
    `https://dog.ceo/api/breed/${getSecondWord(dogoName)}/images`
   );
   const data: { message: string[]; status: string } = await response.json();
   setLstDogoImgs(filterImagesByBreed(data.message, getFirstWord(dogoName)));
  } catch (error) {
   console.error("Error fetching dog images:", error);
  }
 };

 useEffect(() => {
  fetchImages();
 }, []);
 return (
  <>
   {children}
   <dialog id={`my_modal_${dogoName}`} className="modal">
    <div className="modal-box w-11/12 max-w-5xl h-5/6">
     <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
       ✕
      </button>
     </form>
     <h3 className="font-bold text-4xl p-2 flex items-center justify-center">
      {capitalizeString(dogoName)} Gallery!
     </h3>
     <div className="columns-1 sm:columns-2 md:columns-3 lg:column-4 gap-2">
      {lstDogoImgs.map((image, index) => (
       <img
        key={index}
        src={image}
        alt={`Random Image ${index + 1}`}
        className="w-full mb-2 break-inside-avoid rounded-lg"
       />
      ))}
     </div>
    </div>
   </dialog>
  </>
 );
}

export default GalleryModal;
