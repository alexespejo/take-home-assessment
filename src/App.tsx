import { useState, useEffect } from "react";
import DogoCard from "./components/DogoCard";
import DogoNavbar from "./components/DogoNavbar";
import { FaHeart, FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";

function App() {
 const [filter, setFilter] = useState<string>("");
 const [dogos, setDogos] = useState<{ [key: string]: string[] }>({});
 const [lstDogos, setListDogos] = useState<string[]>([]);
 const [sizeOfList, setSizeOfList] = useState<number>(12);
 const [isAscending, setIsAscending] = useState(true);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFilter(e.target.value);
 };

 const filteredBreeds = lstDogos
  .filter((breed) => breed.toLowerCase().includes(filter.toLowerCase()))
  .sort((a, b) => (isAscending ? a.localeCompare(b) : b.localeCompare(a)));

 const fetchData = async (mounted: boolean) => {
  try {
   const response = await fetch("https://dog.ceo/api/breeds/list/all");

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   if (mounted) {
    const result = await response.json();
    // process keys into an array
    setDogos(result.message);
    setListDogos(Object.keys(result.message));
    setLoading(false);
   }
  } catch (err: any) {
   if (mounted) {
    setError(err.message);
    setLoading(false);
   }
  }
 };

 useEffect(() => {
  let isMounted = true;
  fetchData(isMounted);
  return () => {
   isMounted = false;
  };
 }, []);

 return (
  <main className="flex flex-col justify-center">
   {/* <DogoNavbar /> */}

   <DogoNavbar onChange={handleInputChange}>
    <div
     className="tooltip tooltip-primary tooltip-bottom"
     data-tip="Sort Alphabetically"
    >
     {!isAscending ? (
      <button
       className="btn btn-primary join-item sm:text-lg"
       onClick={() => setIsAscending(true)}
      >
       <span className="hidden sm:block">Ascending</span>
       <FaSortAlphaUp />
      </button>
     ) : (
      <button
       className="btn btn-primary join-item sm:text-lg"
       onClick={() => setIsAscending(false)}
      >
       <span className="hidden sm:block">Descending</span>
       <FaSortAlphaDown />
      </button>
     )}
    </div>

    <button className="btn btn-primary sm:text-lg absolute right-2">
     <span className="hidden sm:block">Favorites</span> <FaHeart />
    </button>
   </DogoNavbar>
   <button
    className="btn fixed bottom-0 right-0"
    onClick={() => setSizeOfList(sizeOfList + 3)}
   >
    Add Dogo {sizeOfList}
   </button>

   <div className="flex flex-wrap justify-center gap-4 p-4">
    {filteredBreeds.slice(0, sizeOfList).map((dogName, id) => (
     <div key={id}>
      <DogoCard dogoName={dogName} subBreeds={[...dogos[dogName]]} />
     </div>
    ))}
   </div>
  </main>
 );
}

export default App;
