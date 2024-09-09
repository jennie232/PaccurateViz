"use client";

import React from 'react';
import { Box, Text, Divider, Flex, Button } from '@chakra-ui/react';
import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepSeparator, useSteps, StepIcon, StepNumber } from '@chakra-ui/stepper';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { ItemModal } from "@/components/ItemSet/ItemModal";
import { ItemList } from "@/components/ItemSet/ItemList";
import { BoxTypeSet } from "@/components/BoxType/BoxTypeSet";
import { testPaccurateApi } from "@/app/testPaccurateApi";

const steps = [
    { title: "Item Set" },
    { title: "Box Type" },
    { title: "Rules" },
    { title: "Rate Tables" },
];

const handleTestApi = async () => {
    try {
        const response = await testPaccurateApi();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

function PaccurateStepper() {
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    });

    return (
        <Box p={4}>
            <Box p={6}>
                <Stepper size='sm' index={activeStep} colorScheme='purple'>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator
                                sx={{
                                    '[data-status=complete] &': {
                                        background: 'purple.600',
                                        borderColor: 'purple.600',
                                    },
                                    '[data-status=active] &': {
                                        borderColor: 'purple.600',
                                        color: 'purple.600',
                                    },
                                    '[data-status=incomplete] &': {
                                        borderColor: 'gray.400',
                                        color: 'gray.400',
                                    },
                                }}>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink="0">
                                <StepTitle
                                    style={{
                                        color: activeStep === index ? '#6B46C1' : (activeStep > index ? '#000000`' : '#A0AEC0'),
                                        fontWeight: 'bold',
                                        marginLeft: '6px',
                                    }}
                                >
                                    {step.title}
                                </StepTitle>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

            </Box>
            <Divider mt={2} />

            <Box p={6}>
                {activeStep === 0 && (
                    <Flex flexDirection="column" gap={4}>

                        <Flex mb={4} justify="space-between" align="center">
                            <Box>
                                <Text fontSize="2xl" fontWeight="bold">
                                    Create Items
                                </Text>
                                <Text mt={2} fontSize="sm" color="blackAlpha.600" fontWeight={500}>
                                    Define the items that need to be packed.
                                </Text>
                            </Box>
                            <ItemModal />
                        </Flex>
                        <ItemList />
                    </Flex>
                )}
                {activeStep === 1 && (
                    <>
                        <Flex flexDirection="column" gap={4}>
                            <Box mb={10}>
                                <Text fontSize="2xl" fontWeight="bold">
                                    Create Box Types
                                </Text>
                                <Text mt={2} fontSize="sm" color="blackAlpha.600">
                                    Either select a predefined box type or create a custom one. You can select multiple box types.
                                </Text>
                            </Box>
                        </Flex>
                        <Button onClick={handleTestApi} colorScheme="green">
                            Test Paccurate API
                        </Button>
                        <BoxTypeSet />

                    </>
                )}
                {activeStep === 2 && (
                    <Text>Rules content will go here</Text>
                )}
                {activeStep === 3 && (
                    <Text>Rate Tables content will go here</Text>
                )}
            </Box>

            <Box
                position="fixed"
                bottom="0"
                left="0"
                width="100%"
                bg="white"
                p={6}
            >
                <Divider mt={2} />
                <Flex mt={4} p={6} justify="space-between">
                    <Button
                        fontSize="sm"
                        onClick={() => setActiveStep(activeStep - 1)}
                        isDisabled={activeStep === 0}
                    >
                        <ArrowBackIcon mr={2} />
                        Back
                    </Button>
                    <Button
                        fontSize="sm"
                        bg="purple.600"
                        color="white"
                        _hover={{ bg: 'purple.700' }}
                        onClick={() => setActiveStep(activeStep + 1)}
                        isDisabled={activeStep === steps.length - 1}
                    >
                        Next
                        <ArrowForwardIcon ml={2} />
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default PaccurateStepper;
