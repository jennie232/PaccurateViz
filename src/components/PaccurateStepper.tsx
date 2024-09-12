"use client";
import React from 'react';
import { Box, Text, Divider, Flex, Button } from '@chakra-ui/react';
import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepSeparator, useSteps, StepIcon, StepNumber } from '@chakra-ui/stepper';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { BoxTypeSet } from "@/components/BoxTypes/BoxTypeSet";
import { ResponseDisplay } from '@/components/Response/ResponseDisplay';
import { ItemSet } from './Items/ItemSet';
import { RuleDisplay } from './Rules/RuleDisplay';
import { usePaccurateStore } from '@/app/store/paccurateStore';


const steps = [
    { title: "Item Set" },
    { title: "Box Type" },
    { title: "Rules" },
    { title: "Create Pack" },
];

function PaccurateStepper() {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });
    const { items, isAnyBoxTypeSelected } = usePaccurateStore();
    return (
        <Box height="700px" bg="white" boxShadow="md" borderRadius="md" overflowY="scroll"
            sx={{
                '&::-webkit-scrollbar': {
                    width: '8px',
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                },
            }}
        >
            <Box>
                <Stepper p={4} mx={2} size='sm' index={activeStep} colorScheme='purple'>
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
                                        fontSize: '12px',
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
            <Divider />
            <Flex flexDirection="column" justifyContent="space-between" height="600px">
                <Box p={6}>
                    {activeStep === 0 && (
                        <Flex flexDirection="column" gap={4}>
                            <ItemSet />
                        </Flex>

                    )}
                    {activeStep === 1 && (
                        <>
                            <Flex flexDirection="column" gap={4}>
                                <BoxTypeSet />
                            </Flex>
                        </>
                    )}
                    {activeStep === 2 && (
                        <RuleDisplay />
                    )}
                    {activeStep === 3 && (
                        <ResponseDisplay />
                    )}
                </Box>

                <Box
                    width="100%"
                    px={6}
                >
                    <Divider />
                    <Flex mt={2} px={2} py={2} justify="space-between">
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
                            isDisabled={activeStep === steps.length - 1 || (activeStep === 0 && items.length === 0) || (activeStep === 1 && !isAnyBoxTypeSelected())}
                        >
                            Next
                            <ArrowForwardIcon ml={2} />
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default PaccurateStepper;
