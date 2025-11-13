import { Link } from "react-router-dom";

const DualImageSection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Image */}
          <Link to="/collections/1" className="group relative aspect-[3/4] overflow-hidden">
            <img
              src="/src/assets/product-1.jpg"
              alt="Collection 1"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">NEW ARRIVALS</h3>
              <p className="text-sm tracking-wider">EXPLORE COLLECTION</p>
            </div>
          </Link>

          {/* Right Image */}
          <Link to="/collections/2" className="group relative aspect-[3/4] overflow-hidden">
            <img
              src="/src/assets/product-2.jpg"
              alt="Collection 2"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">LOOKBOOK</h3>
              <p className="text-sm tracking-wider">DISCOVER STYLE</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DualImageSection;
