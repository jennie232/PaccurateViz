import PaccurateStepper from "@/components/PaccurateStepper";
import { Box, Flex } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import { ResponseDisplay } from '@/components/Response/ResponseDisplay';

export default function Home() {
  return (
    <Flex flexDirection="column" height="100vh" overflow="hidden">
      <NavBar />
      <Flex flex="1" overflow="hidden">
        <Box width="78%" overflow="hidden" pt={4} mt={4}>
          <PaccurateStepper />
        </Box>
        <Box width="22%" borderLeft="1px solid" borderColor="gray.200">
          <ResponseDisplay />
        </Box>
      </Flex>
    </Flex>
  );
}