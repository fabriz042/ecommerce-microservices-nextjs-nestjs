import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-green-500 border-2 w-full max-w-[1300px] px-[0.5%] mt-2 mb-2">
        {children}
      </div>
    </div>
  );
};

export default Container;
