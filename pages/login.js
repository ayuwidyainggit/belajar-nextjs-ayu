import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
export default function login() {
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    });

    console.log("login", response);
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
