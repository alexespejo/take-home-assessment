function CardControls({ children }: { children: React.ReactNode }) {
 return (
  <div className="flex justify-between p-4 items-center w-80 h-1/4 ">
   <div className="join">{children}</div>
  </div>
 );
}

export default CardControls;
