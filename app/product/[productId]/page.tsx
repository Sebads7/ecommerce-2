import Container from "@/app/components/Container";
import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import ListRaiting from "./ListRaiting";

interface IPrams {
  productId?: string;
}

const page = ({ params }: { params: IPrams }) => {
  console.log("params", params);

  const product = products.find((item) => item.id === params.productId);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRaiting product={product} />
        </div>
      </Container>
    </div>
  );
};

export default page;
