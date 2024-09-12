"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    VStack,
    HStack,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { usePaccurateStore } from '@/app/store/paccurateStore';

const schema = yup.object().shape({
    name: yup.string().nullable(),
    dimensions: yup.object().shape({
        x: yup.number()
            .typeError('Dimensions must be filled out and positive')
            .positive('Dimensions must be positive')
            .required('Dimensions must be filled out'),
        y: yup.number()
            .typeError('Dimensions must be filled out and positive')
            .positive('Dimensions must be positive')
            .required('Dimensions must be filled out'),
        z: yup.number()
            .typeError('Dimensions must be filled out and positive')
            .positive('Dimensions must be positive')
            .required('Dimensions must be filled out'),
    }).test('dimensions', 'Dimensions must be filled out and must be positive', (value) => {
        return value.x > 0 && value.y > 0 && value.z > 0;
    }),
    weightMax: yup.number().typeError('Max weight must be filled out and non-negative')
        .min(0, 'Max weight must be non-negative')
        .required('Max weight must be filled out'),
    weightTare: yup.number().nullable().transform((value, originalValue) =>
        originalValue === '' || originalValue === null || originalValue === undefined ? null : value
    ),
    price: yup.number().nullable().transform((value, originalValue) =>
        originalValue === '' || originalValue === null || originalValue === undefined ? null : value
    ),
});

type BoxTypeFormData = yup.InferType<typeof schema>;

interface BoxTypeFormProps {
    onClose: () => void;
    editingBoxType?: BoxTypeFormData & { id: string };
}

export const BoxTypeForm: React.FC<BoxTypeFormProps> = ({ onClose, editingBoxType }) => {
    const { addCustomBoxType, updateCustomBoxType } = usePaccurateStore();

    const { register, handleSubmit, formState: { errors } } = useForm<BoxTypeFormData>({
        resolver: yupResolver(schema),
        defaultValues: editingBoxType,
    });

    const onSubmit: SubmitHandler<BoxTypeFormData> = (data) => {
        if (editingBoxType) {
            updateCustomBoxType(editingBoxType.id, data);
        } else {
            addCustomBoxType(data);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6} align="stretch">
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel fontWeight="bold" fontSize="sm">Name (optional)</FormLabel>
                    <Input {...register('name')} />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.dimensions}>
                    <FormLabel fontWeight="bold" fontSize="sm">Dimensions</FormLabel>
                    <HStack>
                        <NumberInput min={0}>
                            <NumberInputField {...register('dimensions.x')} placeholder="x (height)" sx={{ '::placeholder': { fontSize: 'sm' } }} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <NumberInput min={0}>
                            <NumberInputField {...register('dimensions.y')} placeholder="y (width)" sx={{ '::placeholder': { fontSize: 'sm' } }} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <NumberInput min={0}>
                            <NumberInputField {...register('dimensions.z')} placeholder="z (length)" sx={{ '::placeholder': { fontSize: 'sm' } }} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                    <FormErrorMessage>
                        {errors.dimensions?.x?.message || errors.dimensions?.y?.message || errors.dimensions?.z?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.weightMax}>
                    <FormLabel fontWeight="bold" fontSize="sm">Maximum Weight</FormLabel>
                    <NumberInput min={0}>
                        <NumberInputField {...register('weightMax')} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.weightMax?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.weightTare}>
                    <FormLabel fontWeight="bold" fontSize="sm">Tare Weight (optional)</FormLabel>
                    <NumberInput min={0}>
                        <NumberInputField {...register('weightTare')} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.weightTare?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.price}>
                    <FormLabel fontWeight="bold" fontSize="sm">Price (optional)</FormLabel>
                    <NumberInput min={0}>
                        <NumberInputField {...register('price')} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" width="100%">
                    <Button type="submit" bg="purple.600" color="white" _hover={{ bg: 'purple.800' }} fontSize="sm">
                        {editingBoxType ? 'Update' : 'Add'} Box Type
                    </Button>
                </Flex>
            </VStack>
        </form>
    );
};