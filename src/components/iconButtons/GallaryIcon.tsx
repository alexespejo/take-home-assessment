import { GrGallery } from "react-icons/gr";

import IconButton from "../util-components/IconButton";
import GalleryModal from "../GalleryModal";

function GallaryIcon({
 className,
 dogoName,
 imgExist,
}: {
 className: string;
 dogoName: string;
 imgExist: boolean;
}) {
 return (
  <>
   <GalleryModal dogoName={dogoName}>
    <IconButton className={className} toolTip="View Gallery">
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
    </IconButton>
   </GalleryModal>
  </>
 );
}

export default GallaryIcon;
