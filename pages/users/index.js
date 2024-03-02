// import Layout from "@/layout";
import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function index() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("err =>", err));
  }, []);
  return (
    <LayoutComponent metaTitle="user" metaDesc="semua informasi seputar user">
      <p>ini user</p>
      <Image src="/image.png" width={400} height={400} alt="next" />
      <img src="/image.png" style={{ width: 400, height: 400 }} alt="next" />
    </LayoutComponent>
  );
}
