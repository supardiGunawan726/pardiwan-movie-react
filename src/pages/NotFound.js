import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return (
    <section className="w-full my-8 flex flex-col justify-center items-center">
      <div className="font-bold tracking-widest text-9xl text-white">404</div>
      <div className="text-gray-200 mt-4">
        Page not found, go to{" "}
        <Link to="/" className="text-blue-500">
          homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
