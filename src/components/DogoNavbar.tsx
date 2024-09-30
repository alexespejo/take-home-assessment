import { PiDogFill } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

function DogoNavbar({
 children,
 onChange,
 onClear,
}: {
 children: React.ReactNode;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onClear: () => void;
}) {
 return (
  <div className="navbar bg-base-100 shadow-xl rounded-xl sticky top-0 z-20 space-x-2 sm:space-x-5">
   <button className="btn btn-outline text-4xl hidden sm:flex items-center justify-center">
    <span className="sm:block hidden">Filter</span>
    <PiDogFill />
   </button>
   <div className="join">
    <input
     type="text"
     placeholder="Search by dog breed"
     className="input input-bordered join-item sm:text-lg md:w-96 "
     onChange={onChange}
    />
    <div className="tooltip tooltip-right" data-tip="Reset Filters">
     <button className="btn btn-primary join-item text-lg" onClick={onClear}>
      Reset <GrPowerReset />
     </button>
    </div>
   </div>
   {children}
  </div>
 );
}

export default DogoNavbar;
