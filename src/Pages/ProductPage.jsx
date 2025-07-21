import { useParams } from "react-router";
import { useProductStore } from "../store/Productstore";
import Card from "../components/Card";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function ProductsPage() {
  const { category, subcategory } = useParams();
  const { products } = useProductStore();

  const filteredProducts = products.filter((product) => {
    if (subcategory) {
      return (
        product.category === category && product.subcategory === subcategory
      );
    }
    return product.category === category;
  });

  return (
    <div className="">
      <Nav />
      <div className="p-6 min-h-[80vh] w-[80%] mx-auto">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {subcategory ? `${subcategory} in ${category}` : category}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {filteredProducts.map((product, index) => (
              <Card key={index} {...product} />
            ))}
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
