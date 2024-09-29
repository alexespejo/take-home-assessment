import { capitalizeString } from "../../lib/StringHelper";
function CardImg({ imgDogo, dogoName }: { imgDogo: string; dogoName: string }) {
 return (
  <div className="relative w-80 h-3/4">
   {" "}
   <img
    src={imgDogo}
    alt={`img-${dogoName}`}
    className="rounded-md w-full h-full object-cover rounded-b-none"
   />
   <h2 className="text-xl absolute bottom-1 left-0 hover:scale-105 hover:left-1">
    <span className="badge badge-lg rounded-l-none font-bold shadow-none">
     The {capitalizeString(dogoName)}
    </span>
   </h2>
  </div>
 );
}

export default CardImg;
