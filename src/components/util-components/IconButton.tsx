function IconButton({
 className,
 toolTip,
 children,
}: {
 className: string;
 toolTip: string;
 children: React.ReactNode;
}) {
 return (
  <div
   className={`text-xl tooltip text-primary tooltip-primary tooltip-bottom ${className}`}
   data-tip={toolTip}
  >
   {children}
  </div>
 );
}

export default IconButton;
