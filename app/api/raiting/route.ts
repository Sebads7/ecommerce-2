import { getCurrentUser } from "@/actions/getCurrentUsers";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { comment, rating, product, userId } = body;

  const deliverOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  if (userReview || !deliverOrder) {
    return NextResponse.error();
  }

  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      product: { connect: { id: product.id } },
      user: { connect: { id: userId } },
    },
  });

  return NextResponse.json(review);
}
