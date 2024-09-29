function CardBody({ children }: { children: React.ReactNode }) {
 return (
  <div className="rounded-md w-80 h-80 bg-white shadow-xl relative border-[1]">
   {children}
  </div>
 );
}

export default CardBody;
