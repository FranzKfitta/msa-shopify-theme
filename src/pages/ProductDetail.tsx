import { useState } from "react";
import { useParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Silk Blouse",
    price: 295,
    priceDisplay: "€295",
    description: "A timeless silk blouse crafted with attention to every detail. Made from the finest mulberry silk, this piece embodies elegance and sophistication.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Mulberry Silk",
      "Dry clean only",
      "Made in Italy",
      "Model is wearing size S"
    ]
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${id}-${selectedSize}`,
        title: product.name,
        variant: `Size ${selectedSize}`,
        price: product.price,
        image: product.images[0],
      });
    }
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (Size ${selectedSize})`,
    });
  };

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-[3/4] overflow-hidden">
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="md:sticky md:top-24 md:h-fit">
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
            <p className="text-2xl mb-8">{product.priceDisplay}</p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <Separator className="mb-8" />

            {/* Size Selection */}
            <div className="mb-8">
              <p className="font-medium mb-4">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-medium mb-4">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Bag */}
            <Button className="w-full mb-8 h-12" onClick={handleAddToCart}>
              Add to Bag
            </Button>

            <Separator className="mb-8" />

            {/* Product Details */}
            <div>
              <p className="font-medium mb-4">Details</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
