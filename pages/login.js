import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function login() {
  const toast = useToast();
  const { mutate } = useMutation();
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    });
    if (!response?.success) {
      toast({
        title: "Login Failure.",
        description: "please input your email and password correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });

      router.push("/");
    }

    // console.log("login", response);
  };
  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4">LOGIN</Heading>
        <FormControl>
          <Input
            placeholder="email"
            value={payload?.email}
            onChange={(event) =>
              setPayload({ ...payload, email: event.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="password"
            type="password"
            value={payload?.password}
            onChange={(event) =>
              setPayload({ ...payload, password: event.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <Button onClick={() => HandleSubmit()}>Login</Button>
        </FormControl>
      </Stack>
    </Flex>
  );
}
