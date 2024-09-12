import PaccurateStepper from "@/components/PaccurateStepper";
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { NavBar } from '@/components/UI/NavBar';
import { ResponseDisplay } from '@/components/Response/ResponseDisplay';

export default function Home() {
  return (
    <Flex flexDirection="column" minWidth="980px" minHeight="100vh" bg="#F9FAFC">
      <NavBar />
      <Flex flex="1" overflow="hidden" px={6}>
        <Box width="100%" overflow="hidden" mt={4}>
          <Tabs variant='soft-rounded' size='sm' colorScheme='purple'>
            <TabList mx={4}>
              <Tab fontSize="xs">Pack Configuration</Tab>
              {/* <Tab fontSize="xs">Pack Results</Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <PaccurateStepper />
              </TabPanel>
              <TabPanel>
                <ResponseDisplay />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
}