import Layout from "@/layout";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState();
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes"
      );
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  console.log("notes nya ", notes);
  return (
    <>
      <Layout metaTitle="home">
        {/* {notes.data.map((item, index) => (
          <Link href={`/notes/${item.id}`}>
            <div style={{ border: "1px solid gray", marginBottom: "2px" }}>
              <p>{item.title}</p>
            </div>
          </Link>
        ))} */}
        <Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {notes?.data?.map((item) => (
              <GridItem>
                <Card>
                  <CardHeader>
                    <Heading>{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                  </CardBody>
                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      "& > button": {
                        minW: "136px",
                      },
                    }}
                  >
                    <Button flex="1" variant="ghost">
                      Edit
                    </Button>
                    <Button flex="1" variant="ghost">
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
