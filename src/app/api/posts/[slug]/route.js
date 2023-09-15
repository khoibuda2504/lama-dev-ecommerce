import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const findPost = await prisma.post.findUnique({
      where: { id: slug },
    });
    if (!findPost) {
      return new NextResponse(JSON.stringify({ data: null }, { status: 200 }));
    }
    const post = await prisma.post.update({
      where: { id: slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// DELETE SINGLE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    await prisma.post.delete({
      where: { id: slug },
    });
    return new NextResponse(JSON.stringify({ message: `Deleted ${slug} successfully` }, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};