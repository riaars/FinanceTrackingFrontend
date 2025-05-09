import { IoFastFood } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { IoStarSharp } from "react-icons/io5";
import { IoIosFitness } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { MdFlight } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { IoWater } from "react-icons/io5";
import { GiLipstick } from "react-icons/gi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { FaGifts } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { RiRefund2Fill } from "react-icons/ri";

export const CategoryIcons = (category: string) => {
  switch (category) {
    case "Food & Dining":
      return <IoFastFood fontSize={"18px"} />;
    case "Transportation":
      return <FaCarAlt fontSize={"18px"} />;
    case "Entertainment":
      return <MdMovieFilter fontSize={"18px"} />;
    case "Housing":
      return <FaHome fontSize={"18px"} />;
    case "Shopping":
      return <HiMiniShoppingBag fontSize={"18px"} />;
    case "Health & Fitness":
      return <IoIosFitness fontSize={"18px"} />;
    case "Travel":
      return <MdFlight fontSize={"18px"} />;
    case "Education":
      return <IoMdSchool fontSize={"18px"} />;
    case "Salary":
      return <GrMoney fontSize={"18px"} />;
    case "Bills & Utilities":
      return <IoWater fontSize={"18px"} />;
    case "Personal Care":
      return <GiLipstick fontSize={"18px"} />;
    case "Insurance":
      return <AiOutlineFileProtect fontSize={"18px"} />;
    case "Business":
      return <FaBuilding fontSize={"18px"} />;
    case "Rental":
      return <RiHotelLine fontSize={"18px"} />;
    case "Gifts":
      return <FaGifts fontSize={"18px"} />;
    case "Investment":
      return <RiStockFill fontSize={"18px"} />;
    case "Refunds":
      return <RiRefund2Fill fontSize={"18px"} />;
    default:
      return <IoStarSharp fontSize={"18px"} />;
  }
};
