import { useState, useEffect } from "react";
import DogoCard from "./components/DogoCard";
import DogoNavbar from "./components/DogoNavbar";
import { FaArrowUp, FaHeart, FaArrowLeft } from "react-icons/fa";
import { parseObject } from "./lib/ObjectHelper";
import { readFromLocalStorage } from "./lib/LocalStorage";
import { capitalizeString } from "./lib/StringHelper";
import GalleryModal from "./components/GalleryModal";
import WelcomeModal from "./components/WelcomeModal";

function App() {
 const [filter, setFilter] = useState<string>("");
 const [lstDogos, setListDogos] = useState<string[]>([]);
 const [lstFavs, setLstFavs] = useState<string[]>([]);

 const [sizeOfList, setSizeOfList] = useState<number>(12);
 const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
 const [loading, setLoading] = useState(true);
 const [isArrowVisible, setIsArrowVisible] = useState<boolean>(false);

 const isFavorite = (breed: string) => {
  if (displayFavorites) {
   return lstFavs.includes(breed.toLowerCase());
  }
  return true;
 };

 const filterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFilter(e.target.value);
 };

 let filteredBreeds = lstDogos.filter(
  (breed) =>
   breed.toLowerCase().includes(filter.toLowerCase()) && isFavorite(breed)
 );

 const getFavorites = () => {
  let storage: string[] = readFromLocalStorage("favs")?.split(";") || [];
  setLstFavs(storage);
 };

 const filterFavorites = () => {
  getFavorites();
  setDisplayFavorites(!displayFavorites);
 };

 const fetchData = async (mounted: boolean) => {
  try {
   const response = await fetch("https://dog.ceo/api/breeds/list/all");

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   if (mounted) {
    const result = await response.json();
    setListDogos(parseObject(result.message));
    setLoading(false);
   }
  } catch (err: any) {
   if (mounted) {
    setLoading(false);
   }
  }
 };

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 const clearFilter = () => {
  setFilter("");
  setDisplayFavorites(false);
 };

 useEffect(() => {
  let isMounted = true;

  getFavorites();
  fetchData(isMounted);

  const handleScroll = () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    setSizeOfList((prevSize) => prevSize + 12);
   }
   if (window.scrollY > 100) {
    setIsArrowVisible(true);
   } else {
    setIsArrowVisible(false);
   }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
   isMounted = false;
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);

 return (
  <main className="flex flex-col justify-center overflow-x-hidden">
   <DogoNavbar onChange={filterTextChange} onClear={clearFilter}>
    <button
     className="btn btn-primary sm:text-lg absolute right-2 lg:hidden"
     onClick={filterFavorites}
     disabled={lstFavs.length === 0}
    >
     <span className="hidden lg:block">Favorites</span> <FaHeart />
    </button>
   </DogoNavbar>

   <WelcomeModal />
   {loading ? (
    <span className="loading loading-spinner loading-lg"></span>
   ) : (
    <>
     {" "}
     <div className="h-96 min-w-48 overflow-x-auto fixed right-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-50 ">
      {displayFavorites ? (
       <button className="btn btn-primary" onClick={filterFavorites}>
        <FaArrowLeft />
        Back
       </button>
      ) : (
       ""
      )}
      <table className="table table-pin-rows">
       <thead>
        <tr>
         <th>Favorites</th>
        </tr>
       </thead>

       <tbody>
        <tr
         role="button"
         className={`${lstFavs.length > 0 ? "block" : "hidden:"}`}
         tabIndex={0}
         onClick={filterFavorites}
        >
         <td>All Dogs</td>
        </tr>
        {lstFavs.map((dogoName) =>
         dogoName !== "" ? (
          <GalleryModal dogoName={dogoName}>
           <tr
            onClick={async () => {
             // filterFavorites(true);
             // setFilter(dogoName);
             (
              document.getElementById(
               `my_modal_${dogoName}`
              ) as HTMLDialogElement
             )?.showModal();
            }}
            role="button"
            tabIndex={0}
           >
            <td>{capitalizeString(dogoName)}</td>
           </tr>
          </GalleryModal>
         ) : (
          ""
         )
        )}
       </tbody>
      </table>
     </div>
     <button
      className={`btn btn-primary fixed bottom-3 right-3 btn-circle text-3xl border-2 border-black ${
       isArrowVisible ? "" : "hidden"
      } `}
      onClick={scrollToTop}
     >
      <FaArrowUp />
     </button>
     <div className="flex flex-wrap justify-center lg:justify-start lg:items-start gap-4 p-4 w-5/6">
      {filteredBreeds.slice(0, sizeOfList).map((dogName, id) => (
       <div key={id}>
        <DogoCard
         dogoName={dogName}
         bFav={displayFavorites}
         func={getFavorites}
        />
       </div>
      ))}
     </div>
    </>
   )}
  </main>
 );
}

export default App;
