import { capitalizeString } from "../../lib/StringHelper";
function CardImg({ imgDogo, dogoName }: { imgDogo: string; dogoName: string }) {
 return (
  <div className="relative w-80 h-3/4">
   {" "}
   {imgDogo ? (
    <img
     src={imgDogo}
     alt={`img-${dogoName}-${imgDogo}`}
     className="rounded-md w-full h-full object-cover rounded-b-none"
    />
   ) : (
    <div className="skeleton h-52 w-full relative flex items-center justify-center px-5">
     unfortunately no image of a the {dogoName} has been uploaded :{"("}
    </div>
   )}
   <h2 className="text-xl absolute bottom-1 left-0 hover:scale-105 hover:left-1">
    <span className="badge badge-lg rounded-l-none font-bold shadow-none">
     The {capitalizeString(dogoName)}
    </span>
   </h2>
  </div>
 );
}

export default CardImg;
