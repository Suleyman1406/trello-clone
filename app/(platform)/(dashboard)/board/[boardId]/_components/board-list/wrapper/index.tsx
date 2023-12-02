import React from "react";

interface IListWrapperProps {
  children: React.ReactNode;
}
const ListWrapper = ({ children }: IListWrapperProps) => {
  return (
    <li className="flex-shrink-0 h-4 w-[272px] select-none">{children}</li>
  );
};

export default ListWrapper;
