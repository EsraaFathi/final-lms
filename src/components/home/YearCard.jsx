/* eslint-disable react/prop-types */
const YearCard = ({ imageSrc, title, courseText, onClick }) => {
  return (
    <div
      className="flex flex-col mb-10 cursor-pointer sm:m-4 md:m max-w-xs"
      onClick={onClick}
    >
      <div className="group rounded-lg h-[169px] w-[300px] overflow-hidden aspect-w-16 aspect-h-9">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
          src={imageSrc || "/images/category.jpg"}
          alt={title || "Category image"}
        />
      </div>

      <div className="group px-4 mx-4 sm:px-6 md:px-8 py-3 rounded-lg -mt-6  bg-gray-100 relative transition-transform duration-300 ease-in-out transform hover:scale-105">
        <h3 className="text-lg sm:text-xl md:text-2xl mb-2 text-center text-primaryBG">
          {title || "The Coldest Sunset"}
        </h3>
        <div className="w-full h-1 bg-secondaryBG mb-2"></div>
        <h3
          className="text-center cursor-pointer text-sm hover:font-bold sm:text-base text-gray-400"
          style={{ transition: "color 0.3s ease" }}
          onMouseEnter={(e) => (e.target.style.color = "#15B7FF")}
          onMouseLeave={(e) => (e.target.style.color = "")}
        >
          {courseText || "جميع كورسات الرياضه"}
        </h3>
      </div>
    </div>
  );
};

export default YearCard;
