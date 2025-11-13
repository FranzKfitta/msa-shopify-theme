import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: "1",
    name: "Elegant Blazer",
    price: 285,
    priceDisplay: "€285",
    image: product1,
  },
  {
    id: "2",
    name: "Silk Blouse",
    price: 195,
    priceDisplay: "€195",
    image: product2,
  },
  {
    id: "3",
    name: "Tailored Trousers",
    price: 240,
    priceDisplay: "€240",
    image: product3,
  },
  {
    id: "4",
    name: "Cashmere Sweater",
    price: 320,
    priceDisplay: "€320",
    image: product4,
  },
];

const ProductGrid = () => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.name,
      variant: "Default",
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl font-bold mb-4">FALL WINTER 25</h2>
          <p className="text-muted-foreground text-lg">Timeless pieces for the modern wardrobe</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-secondary rounded-sm mb-4 aspect-[3/4] shadow-subtle hover:shadow-elegant transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="bg-white text-foreground hover:bg-white/90 shadow-lg"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                <p className="text-muted-foreground font-medium">{product.priceDisplay}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/collections">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-base font-medium tracking-wider hover:bg-foreground hover:text-background transition-all"
            >
              VIEW ALL PRODUCTS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
