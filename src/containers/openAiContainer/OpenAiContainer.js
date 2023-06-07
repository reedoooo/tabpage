import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Spinner,
  useToast,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon } from "@chakra-ui/icons";
import { useDebounce } from "use-debounce";
import axios from "axios";

function ChatGPT() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const toast = useToast();

  const OPENAI_API_KEY = "Nwm0eHV3rTxvm8n7TGkLdJhaYM6hs9lD";
  const handleSearch = async () => {
    if (!debouncedQuery) {
      toast({
        title: "Please enter a query.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/openai/v1/completions`,
        {
          model: "text-davinci-002",
          prompt: debouncedQuery,
          max_tokens: 100,
          temperature: 0.7, // Include the temperature parameter here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error); // log the error for debugging
      toast({
        title: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };
  console.log(OPENAI_API_KEY)

  const handleSaveToNotes = () => {
    toast({
      title: "Response saved to notes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  console.log(`${OPENAI_API_KEY}`)

  // Memoize the data object to avoid unnecessary re-renders
  const data = useMemo(
    () => ({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
    }),
    []
  );

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/chat", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const bgColor = useBreakpointValue({ base: "pink.300", md: "purple.300" });
  const headingSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Heading size={headingSize} lineHeight="shorter">
          ChatGPT
        </Heading>
      </Box>

      <Box
        py={8}
        px={4}
        bg="rgba(255, 255, 255, 0.5)"
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxW="600px"
        mx="auto"
      >
        <Flex>
          <Input
            placeholder="Enter your query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            ml={2}
            onClick={handleSearch}
          />
        </Flex>
        {isLoading ? (
          <Flex justify="center" align="center">
            <Spinner size="lg" color="blue.500" />
          </Flex>
        ) : (
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            minHeight="200px"
            overflowY="auto"
            wordBreak="break-word"
          >
            {response}
          </Box>
        )}
        {!isLoading && response && (
          <Flex mt={4} justify="flex-end">
            <IconButton
              aria-label="Save to Notes"
              icon={<CheckIcon />}
              colorScheme="blue"
              onClick={handleSaveToNotes}
            />
          </Flex>
        )}
      </Box>
    </>
  );
}

export default ChatGPT;
