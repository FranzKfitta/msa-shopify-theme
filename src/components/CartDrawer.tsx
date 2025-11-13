import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, itemCount } = useCart();
  const [discountOpen, setDiscountOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-card shadow-elegant border-l border-border transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card flex-shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground">CART</h2>
              {itemCount > 0 && (
                <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                  {itemCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="text-foreground"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 px-6 py-5 border-b border-border">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-normal text-sm mb-1 text-foreground leading-tight">
                      {item.title}
                    </h3>
                    {item.variant !== "Default" && (
                      <p className="text-xs text-muted-foreground mb-2">{item.variant}</p>
                    )}
                    <p className="font-medium text-sm mb-3 text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[32px] text-center text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground flex-shrink-0 self-start mt-1"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">YOUR CART IS EMPTY</h3>
                <p className="text-sm text-muted-foreground mb-6">Continue shopping to add items</p>
                <Button onClick={closeCart} className="h-11">
                  Continue shopping
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border bg-card flex-shrink-0">
              {/* Discount Section */}
              <div className="px-6 py-4 border-b border-border">
                <Collapsible open={discountOpen} onOpenChange={setDiscountOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <span className="text-sm font-medium text-foreground">Discount</span>
                    <Plus className={`h-4 w-4 text-foreground transition-transform ${discountOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter discount code"
                        className="flex-1 px-3 py-2 h-9 border border-input bg-card text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button size="sm" className="h-9">
                        Apply
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Discount codes are applied at checkout
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Total Section */}
              <div className="px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Estimated total</span>
                  <span className="font-bold text-lg text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  Duties and taxes included. Shipping is calculated at checkout.
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full h-11">Check out</Button>
                  <Button variant="outline" className="w-full h-11" onClick={closeCart}>
                    Continue shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
