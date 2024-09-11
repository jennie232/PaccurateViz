"use client";
import React from 'react';
import { Box, Text, Divider, Flex, Button } from '@chakra-ui/react';
import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepSeparator, useSteps, StepIcon, StepNumber } from '@chakra-ui/stepper';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { BoxTypeSet } from "@/components/BoxTypes/BoxTypeSet";
import { testPaccurateApi } from "@/app/testPaccurateApi";
import { ItemSet } from './Items/ItemSet';
import { RuleDisplay } from './Rules/RuleDisplay';
import { usePaccurateStore } from '@/app/store/paccurateStore';


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
        index: 0,
        count: steps.length,
    });
    const { items } = usePaccurateStore();
    return (
        <Box px={4} py={2} position="relative" height="100%">
            <Box px={6} py={1}>
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
                        <ItemSet />
                    </Flex>

                )}
                {activeStep === 1 && (
                    <>
                        <BoxTypeSet />
                    </>
                )}
                {activeStep === 2 && (
                    <RuleDisplay />
                )}
                {activeStep === 3 && (
                    <Text>Rate Tables content will go here</Text>
                )}
            </Box>

            <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                bg="white"
                p={6}
            >
                <Divider mt={2} />
                <Flex mt={2} p={4} justify="space-between">
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
                        isDisabled={activeStep === steps.length - 1 || (activeStep === 0 && items.length === 0)}
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
