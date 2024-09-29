import { PiDogFill } from "react-icons/pi";

function DogoNavbar({
 children,
 onChange,
}: {
 children: React.ReactNode;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
 return (
  <div className="navbar bg-base-100 shadow-xl rounded-xl sticky top-0 z-20 space-x-2 sm:space-x-5">
   <button className="btn btn-outline text-4xl hidden sm:block">
    <PiDogFill />
   </button>
   <input
    type="text"
    placeholder="Search by dog breed"
    className="input input-bordered sm:text-lg md:w-96 "
    onChange={onChange}
   />

   {children}
  </div>
 );
}

export default DogoNavbar;
