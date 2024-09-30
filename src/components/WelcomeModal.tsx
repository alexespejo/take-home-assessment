import { useState } from "react";
import CardBody from "./util-components/CardBody";
import CardControls from "./util-components/CardControls";
import CardImg from "./util-components/CardImg";
import { FaDice, FaHeart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

function WelcomeModal() {
 const [openOnce, setOpenOnce] = useState<boolean>(true);
 return (
  <div>
   <dialog
    id="my_modal_welcome"
    className={`modal  ${openOnce ? "modal-open" : ""}`}
   >
    <div className="modal-box h-3/4 w-5/12 max-w-5xl">
     <h3 className="font-bold text-xl">Welcome To Dogo Gallery!</h3>
     <div className="py-4 flex items-center justify-center">
      <CardBody>
       <CardImg
        imgDogo="https://images.dog.ceo/breeds/bulldog-french/n02108915_3640.jpg"
        dogoName="French Bulldog"
       />
       <CardControls>
        {" "}
        <div className="join">
         <div
          className="tooltip tooltip-open tooltip-left tooltip-primary"
          data-tip="Add to your Favorites"
         >
          <button className="btn join-item btn-secondary btn-outline text-3xl">
           <FaHeart />
          </button>
         </div>

         <div
          className="tooltip tooltip-open tooltip-bottom tooltip-primary"
          data-tip="Get a new image"
         >
          <button className="btn join-item btn-secondary btn-outline text-3xl">
           <FaDice />
          </button>
         </div>

         <div
          className="tooltip tooltip-open tooltip-right tooltip-primary"
          data-tip="View the photo gallery"
         >
          <button className="btn join-item btn-secondary btn-outline text-3xl">
           <GrGallery />
          </button>
         </div>
        </div>
       </CardControls>
      </CardBody>
     </div>
     <div className="modal-action">
      <form method="dialog">
       <button className="btn btn-primary" onClick={() => setOpenOnce(false)}>
        Start Viewing!
       </button>
      </form>
     </div>
    </div>
   </dialog>
  </div>
 );
}

export default WelcomeModal;
