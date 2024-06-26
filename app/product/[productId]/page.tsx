import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRaiting from "./ListRaiting";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUsers";

interface IParams {
  productId: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) return <NullData title="Product not found" />;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRaiting product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
