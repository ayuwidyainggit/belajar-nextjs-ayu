import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import WithAuth from "../WithAuth";
import styles from "./styles.module.css";
import Link from "next/link";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const { mutate } = useMutation();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    console.log("response", response);
    if (!response?.success) {
      alert("gagal logout");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/users">User</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {data?.data?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </div>
  );
}

export default WithAuth(Header);
