import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center debug">
      <div className="w-full max-w-[1300px] px-[0.5%] mt-4 mb-4">
        {children}
      </div>
    </div>
  );
};

export default Container;
