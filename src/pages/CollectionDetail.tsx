import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    name: "Short Jacket",
    price: "€679.00",
    image: product1,
    type: "Jacket",
    color: "Pink",
    size: ["XS", "S", "M", "L"],
  },
  {
    id: 2,
    name: "Fitted Jacket",
    price: "€1,051.00",
    image: product2,
    type: "Jacket",
    color: "Navy",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Short Jacket",
    price: "€650.00",
    image: product3,
    type: "Jacket",
    color: "Pink",
    size: ["XS", "S", "M"],
  },
  {
    id: 4,
    name: "Fitted Jacket",
    price: "€579.00",
    image: product4,
    type: "Jacket",
    color: "Black",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Long Coat",
    price: "€895.00",
    image: product1,
    type: "Coat",
    color: "Beige",
    size: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Classic Blazer",
    price: "€720.00",
    image: product2,
    type: "Jacket",
    color: "Black",
    size: ["S", "M", "L"],
  },
  {
    id: 7,
    name: "Wool Coat",
    price: "€1,120.00",
    image: product3,
    type: "Coat",
    color: "Brown",
    size: ["M", "L", "XL"],
  },
  {
    id: 8,
    name: "Cropped Jacket",
    price: "€590.00",
    image: product4,
    type: "Jacket",
    color: "White",
    size: ["XS", "S", "M", "L"],
  },
];

const CollectionDetail = () => {
  const { id } = useParams();
  const [selectedFilters, setSelectedFilters] = useState<{
    type: string[];
    color: string[];
    size: string[];
  }>({
    type: [],
    color: [],
    size: [],
  });

  const collectionName = "Coats and Jackets";
  const productTypes = ["Coat", "Jacket", "Top"];
  const colors = ["Beige", "Black", "Blue", "Brown", "Green", "Navy", "Pink", "Purple", "White"];
  const sizes = ["XS", "S", "M", "L", "XL", "34", "36", "38", "40", "42"];

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ type: [], color: [], size: [] });
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Collection Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-wide">
          {collectionName}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Product Type Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium uppercase tracking-wider py-2 border-b border-border">
                  Product Type
                  <ChevronDown className="h-4 w-4 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-2">
                  {productTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.type.includes(type)}
                        onChange={() => toggleFilter("type", type)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Color Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium uppercase tracking-wider py-2 border-b border-border">
                  Color
                  <ChevronDown className="h-4 w-4 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.color.includes(color)}
                        onChange={() => toggleFilter("color", color)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Size Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium uppercase tracking-wider py-2 border-b border-border">
                  Size
                  <ChevronDown className="h-4 w-4 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.size.includes(size)}
                        onChange={() => toggleFilter("size", size)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full text-sm"
                >
                  Clear All
                </Button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {products.length} ITEMS
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium uppercase tracking-wider">Sort</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="best-selling">Best selling</SelectItem>
                    <SelectItem value="a-z">Alphabetically, A-Z</SelectItem>
                    <SelectItem value="z-a">Alphabetically, Z-A</SelectItem>
                    <SelectItem value="price-low">Price, low to high</SelectItem>
                    <SelectItem value="price-high">Price, high to low</SelectItem>
                    <SelectItem value="date-old">Date, old to new</SelectItem>
                    <SelectItem value="date-new">Date, new to old</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm uppercase tracking-wide">{product.name}</h3>
                    <p className="text-sm font-medium">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionDetail;
