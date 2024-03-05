import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));
export default function Posts({ posts }) {
  console.log("data post", posts);
  return (
    <LayoutComponent metaTitle="posts" metaDesc="semua informasi seputar user">
      {posts.map((item) => (
        <div>
          <p>{item.id}</p>
          <b>{item.title}</b>
          <p>{item.body}</p>
        </div>
      ))}
    </LayoutComponent>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  // Pass data to the page via props
  return { props: { posts } };
}
