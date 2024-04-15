import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} p-1 h-6 rounded flex justify-center  items-center gap-1  `}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
