export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    await prisma.comment.delete({
      where: { id: slug }
    })
    return new Response(JSON.stringify({
      message: `Comment ${slug} was deleted`
    }), {
      status: 200
    });
  } catch (err) {
    throw new Error(err)
  }
}