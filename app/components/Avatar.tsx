import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <div className="rounded-full">
        <Image src={src} alt="avatar" />
      </div>
    );
  }
  return <FaUserCircle size={24} />;
};

export default Avatar;
