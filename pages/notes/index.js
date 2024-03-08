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
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";

export default function Notes() {
  const { data, isLoading, isError } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  });
  const router = useRouter();
  const [notes, setNotes] = useState();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <Layout metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add
            </Button>
          </Flex>
          {isLoading ? (
            <Flex alignItems="center" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <Flex>
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {data?.data?.map((item) => (
                  <GridItem key={item?.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
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
                        <Button
                          onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item?.id)}
                          flex="1"
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          )}
        </Box>
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
