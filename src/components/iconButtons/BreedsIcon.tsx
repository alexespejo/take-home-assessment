import { useState } from "react";
import { FaDog } from "react-icons/fa";
import IconButton from "../util-components/IconButton";
import { FaInfoCircle } from "react-icons/fa";
import DogoCard from "../DogoCard";
import { capitalizeString } from "../../lib/StringHelper";

function BreedsIcon({
 className = "",
 dogoName,
 subBreeds,
}: {
 className: string;
 dogoName: string;
 subBreeds: string[];
}) {
 const [displayAlert, setDisplayAlert] = useState<boolean>(true);
 return (
  <IconButton className={className} toolTip="View  Sub-Breeds">
   <button
    className={`text-3xl btn btn-secondary btn-outline bg-white border-secondary text-secondary ${className}`}
    onClick={() =>
     (
      document.getElementById(`my_modal_${dogoName}`) as HTMLDialogElement
     )?.showModal()
    }
   >
    <FaDog />
   </button>

   <dialog id={`my_modal_${dogoName}`} className="modal text-neutral">
    <div
     role="alert"
     className={`alert absolute top-1 text-sm sm:w-1/2 ${
      displayAlert ? "flex" : "hidden"
     }`}
    >
     <span className="text-warning">
      <FaInfoCircle />
     </span>
     <span>
      Due to technical limitations the images displayed may not acccurately
      represent the respective breed
     </span>
     <div>
      <button
       className="btn btn-sm btn-warning"
       onClick={() => setDisplayAlert(false)}
      >
       Okay
      </button>
     </div>
    </div>
    <div className="modal-box w-full  h-3/4 relative">
     <h3 className="font-bold text-lg p-1">
      View more{" "}
      <span className="text-secondary">{capitalizeString(dogoName)}</span>{" "}
      breeds!
     </h3>
     <div className="flex flex-col justify-center items-center space-y-2">
      {subBreeds.map((breed: string, id: number) => (
       <div key={id}>
        {/* <DogoCard
         dogoName={`${breed} ${dogoName}`}
         subBreeds={[]}
         bFav={false}
        /> */}
       </div>
      ))}
     </div>
     <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
       ✕
      </button>
     </form>
    </div>
   </dialog>
  </IconButton>
 );
}

export default BreedsIcon;
