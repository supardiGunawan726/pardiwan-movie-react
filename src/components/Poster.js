const Poster = ({ image }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-full rounded-xl bg-white"
    ></div>
  );
};

export default Poster;
