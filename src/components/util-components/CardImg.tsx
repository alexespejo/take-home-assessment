import { capitalizeString } from "../../lib/StringHelper";
function CardImg({ imgDogo, dogoName }: { imgDogo: string; dogoName: string }) {
 return (
  <div className="relative lg:w-64 w-80 h-3/4">
   {" "}
   {imgDogo ? (
    <img
     src={imgDogo}
     alt={`img-${dogoName}-${imgDogo}`}
     className="rounded-md w-full h-full object-cover rounded-b-none"
    />
   ) : (
    <div className="skeleton h-52 w-full relative flex items-center justify-center px-5">
     {dogoName !== "n#n" ? (
      <p className="text-left">
       Unfortunately no image of a the{" "}
       <span className="font-bold">{dogoName}</span> has been uploaded ☹️
      </p>
     ) : (
      <span className="loading loading-spinner loading-md"></span>
     )}
    </div>
   )}
   <h2 className="text-xl absolute bottom-1 left-0 hover:scale-105 hover:left-1">
    <span className="badge badge-lg rounded-l-none font-bold shadow-none">
     {dogoName !== "n#n" ? (
      <span>The {capitalizeString(dogoName)}</span>
     ) : (
      <span className="w-36 text-center">
       <span className="loading loading-dots loading-sm"></span>
      </span>
     )}
    </span>
   </h2>
  </div>
 );
}

export default CardImg;
