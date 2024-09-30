function CardBody({ children }: { children: React.ReactNode }) {
 return (
  <div className="rounded-md lg:w-64 w-80 h-80 bg-white shadow-xl relative border-[1] flex flex-col items-center">
   {children}
  </div>
 );
}

export default CardBody;
