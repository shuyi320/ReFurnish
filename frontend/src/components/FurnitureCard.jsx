const FurnitureCard = () => {
    return (
        <div className="relative bg-white shadow-md rounded-md p-4 group">
            {/* Image Section */}
            <div className="relative">
                <img
                    src="./assets/furniture.jpg"
                    alt="Furniture"
                    className="w-full h-[300px] object-cover rounded-md"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[rgba(58,58,58,0.5)] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                    <p className="text-lg font-semibold">High-quality wooden chair</p>
                    <p className="mt-2">Dimensions: 40x40x90 cm</p>
                    <p className="mt-2">Material: Oak Wood</p>
                    <button className="bg-[#EFB346] text-white px-4 py-2 rounded-md mt-4 hover:scale-125 duration-300 transition">
                        View More Details
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    Wooden Chair
                </h3>
                <p className="text-gray-600 mt-2">
                    Brooklyn, NY
                </p>
            </div>
        </div>
    );
}

export default FurnitureCard;