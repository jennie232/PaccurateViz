import PaccurateStepper from "@/components/PaccurateStepper";
import { Box, Flex } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import { ResponseDisplay } from '@/components/Response/ResponseDisplay';

export default function Home() {
  return (
    <Box>
      <NavBar />
      <Flex width="100%" height="calc(100vh - 60px)"> {/* Adjust 60px based on your NavBar height */}
        <Box width="70%" p={4}>
          <PaccurateStepper />
        </Box>
        <Box width="30%" p={4} borderLeft="1px solid" borderColor="gray.200">
          <ResponseDisplay />
        </Box>
      </Flex>
    </Box>
  );
}