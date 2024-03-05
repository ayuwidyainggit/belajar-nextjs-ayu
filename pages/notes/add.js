import Layout from "@/layout";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AddNotes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  console.log("notes nya ", notes);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.push("/notes");
      }
      console.log("result ", result);
    } catch (error) {}
  };
  return (
    <>
      <Layout metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>AddNotes</Heading>
          <Grid gap="4">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                type="text"
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button colorScheme="blue" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </Layout>
    </>
  );
}
