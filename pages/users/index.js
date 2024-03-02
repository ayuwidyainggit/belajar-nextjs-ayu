import Layout from "@/layout";
import { useEffect } from "react";

export default function index() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("err =>", err));
  }, []);
  return (
    <Layout metaTitle="user" metaDesc="semua informasi seputar user">
      <p>ini user</p>
    </Layout>
  );
}
