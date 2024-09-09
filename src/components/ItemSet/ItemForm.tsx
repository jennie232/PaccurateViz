"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usePaccurateStore } from '@/app/store/paccurateStore';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

interface ItemFormProps {
  onClose: () => void;
  editingItem?: ItemFormData & { id: string };
}

// Schema for item form validation
const schema = yup.object().shape({
  refId: yup.number().nullable().transform((value, originalValue) => (originalValue.trim() === '' ? null : value)),
  name: yup.string().nullable(),
  color: yup.string().nullable(),
  weight: yup.number()
    .typeError('Weight must be filled out and  non-negative')
    .min(0, 'Weight must be non-negative')
    .required('Weight must be filled out'),
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
  quantity: yup.number()
    .typeError('Quantity must be filled out and positive')
    .min(0, 'Quantity must be non-negative')
    .required('Quantity must be filled out'),
});

type ItemFormData = yup.InferType<typeof schema>;

export const ItemForm: React.FC<ItemFormProps> = ({ onClose, editingItem }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ItemFormData>({
    resolver: yupResolver(schema),
  });

  const [color, setColor] = React.useState<string>('#ff0000');

  const addItem = usePaccurateStore(state => state.addItem);

  const onSubmit: SubmitHandler<ItemFormData> = (data) => {
    addItem({ ...data, color });
    onClose();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!errors.refId}>
          <FormLabel fontWeight="bold" fontSize="sm">Reference ID (optional)</FormLabel>
          <NumberInput>
            <NumberInputField {...register('refId')} />
          </NumberInput>
          <FormErrorMessage>{errors.refId?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel fontWeight="bold" fontSize="sm">Name (optional)</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.color}>
          <FormLabel fontWeight="bold" fontSize="sm">Color</FormLabel>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
          />
          <FormErrorMessage>{errors.color?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.weight}>
          <FormLabel fontWeight="bold" fontSize="sm">Weight</FormLabel>
          <NumberInput min={0}>
            <NumberInputField {...register('weight')} />
          </NumberInput>
          <FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
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
            <NumberInput min={0} >
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

        <FormControl isInvalid={!!errors.quantity}>
          <FormLabel fontWeight="bold" fontSize="sm">Quantity</FormLabel>
          <NumberInput min={0}>
            <NumberInputField {...register('quantity')} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" bg="purple.600" color="white" _hover={{ bg: 'purple.800' }} fontSize="sm">
          Add Item
        </Button>
      </VStack>
    </form>
  );
}

