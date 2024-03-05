import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Content from "@/components/Content";
import Layout from "@/layout";
import Link from "next/link";

export default function Notes({ notes }) {
  console.log("notes", notes);
  return (
    <>
      <Layout metaTitle="home">
        {notes.data.map((item, index) => (
          <Link href={`/notes/${item.id}`}>
            <div style={{ border: "1px solid gray", marginBottom: "2px" }}>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
