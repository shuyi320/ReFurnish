import { Link } from "react-router-dom";

const FurnitureCard = ({furniture}) => {
    const { title, address, condition, description, status, zipcode, borough} = furniture;
    return (
        <div className="relative bg-white shadow-md rounded-md p-4 group">
            {/* Image Section */}
            <div className="relative">
                <img
                    src="../src/assets/IMG_1225.jpeg"
                    alt="Furniture"
                    className="w-full h-[300px] object-cover rounded-md"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[rgba(58,58,58,0.5)] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                    <p className="text-lg font-semibold">{furniture.title}</p>
                    <button className="bg-[#EFB346] text-white px-4 py-2 rounded-md mt-4 hover:scale-125 duration-300 transition">
                        <Link to={`/furniture/${furniture.id}`}>
                            View More Details
                        </Link>
                    </button>
                </div>
            </div>

            {/* Status Badge */}
            <div
              className={`absolute top-2 right-2 ${
                status === "available" ? "bg-green-500" : "bg-red-500"
              } text-white text-sm font-semibold px-2 py-1 rounded-md`}
            >
              {status}
            </div>
            {/* Condition Badge */}
            <div
              className={`absolute bottom-2 right-2 bg-[#142E38] text-white text-sm font-semibold px-2 py-1 rounded-md`}
            >
              {condition}
            </div>
            {/* Content Section */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    {title}
                </h3>
                <p className="text-gray-600 mt-2">
                    {zipcode}, {borough}
                </p>
            </div>
        </div>
    );
}

export default FurnitureCard;