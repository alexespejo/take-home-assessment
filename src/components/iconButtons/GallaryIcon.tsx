import { GrGallery } from "react-icons/gr";

import GalleryModal from "../GalleryModal";

function GallaryIcon({
 children,
 className,
 dogoName,
 imgExist,
}: {
 children: React.ReactNode;
 className: string;
 dogoName: string;
 imgExist: boolean;
}) {
 return (
  <div>
   <GalleryModal dogoName={dogoName}>
    <button
     className={`text-3xl btn btn-secondary btn-outline bg-white border-secondary text-secondary rounded-l-none`}
     disabled={!imgExist}
     onClick={async () => {
      (
       document.getElementById(`my_modal_${dogoName}`) as HTMLDialogElement
      )?.showModal();
     }}
    >
     <GrGallery />
    </button>
   </GalleryModal>
  </div>
 );
}

export default GallaryIcon;
