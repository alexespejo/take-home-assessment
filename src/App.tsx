import { useState, useEffect } from "react";
import DogoCard from "./components/DogoCard";
import DogoNavbar from "./components/DogoNavbar";
import {
 FaArrowUp,
 FaHeart,
 FaSortAlphaUp,
 FaSortAlphaDown,
} from "react-icons/fa";
import { parseObject } from "./lib/ObjectHelper";
import { readFromLocalStorage } from "./lib/LocalStorage";
import { capitalizeString } from "./lib/StringHelper";

function App() {
 const [filter, setFilter] = useState<string>("");
 const [lstDogos, setListDogos] = useState<string[]>([]);
 const [lstFavs, setLstFavs] = useState<string[]>([]);
 const [fromTable, setFromTable] = useState<boolean>(false);

 const [sizeOfList, setSizeOfList] = useState<number>(12);
 const [isAscending, setIsAscending] = useState(true);
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

 let filteredBreeds = lstDogos
  .filter(
   (breed) =>
    breed.toLowerCase().includes(filter.toLowerCase()) && isFavorite(breed)
  )
  .sort((a, b) => (isAscending ? a.localeCompare(b) : b.localeCompare(a)));

 const getFavorites = () => {
  let storage: string[] = readFromLocalStorage("favs")?.split(";") || [];
  setLstFavs(storage);
 };

 const filterFavorites = (frTable: boolean = false) => {
  getFavorites();
  if (frTable) {
   setFilter("");
   setFromTable(true);
   if (fromTable) {
    setDisplayFavorites(true);
   } else {
    setDisplayFavorites(!displayFavorites);
   }
  } else {
   setFromTable(false);
   setDisplayFavorites(true);
  }
 };

 const fetchData = async (mounted: boolean) => {
  try {
   const response = await fetch("https://dog.ceo/api/breeds/list/all");

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   if (mounted) {
    const result = await response.json();
    // setDogos(result.message);
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
  <main className="flex flex-col justify-center">
   <DogoNavbar onChange={filterTextChange} onClear={clearFilter}>
    <button
     className="btn btn-primary sm:text-lg absolute right-2 lg:hidden"
     onClick={() => filterFavorites()}
     disabled={lstFavs.length === 0}
    >
     <span className="hidden lg:block">Favorites</span> <FaHeart />
    </button>
   </DogoNavbar>
   <div className="h-96 overflow-x-auto fixed left-0 top-1/2 transform -translate-y-1/2 hidden lg:block ">
    <table className="table table-pin-rows">
     <thead>
      <tr>
       <th>Favorites</th>
      </tr>
     </thead>

     <tbody>
      <tr role="button" tabIndex={0} onClick={() => filterFavorites(true)}>
       <td>All Photos</td>
      </tr>
      {lstFavs.map((dogoName) => (
       <tr
        onClick={() => {
         filterFavorites(true);
         setFilter(dogoName);
        }}
        role="button"
        tabIndex={0}
       >
        <td>{capitalizeString(dogoName)}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
   <button
    className={`btn btn-primary fixed bottom-3 right-3 btn-circle text-3xl border-2 border-black ${
     isArrowVisible ? "" : "hidden"
    }`}
    onClick={scrollToTop}
   >
    <FaArrowUp />
   </button>
   <div className="flex flex-wrap justify-center lg:justify-end lg:items-end gap-4 p-4">
    {filteredBreeds.slice(0, sizeOfList).map((dogName, id) => (
     <div key={id}>
      <DogoCard
       dogoName={dogName}
       subBreeds={[]}
       bFav={displayFavorites}
       func={getFavorites}
      />
     </div>
    ))}
   </div>
  </main>
 );
}

export default App;
