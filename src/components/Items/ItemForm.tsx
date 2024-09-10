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
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

interface ItemFormProps {
  onClose: () => void;
  editingItem?: ItemFormData;
}

const schema = yup.object().shape({
  refId: yup.number().positive().integer().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
  name: yup.string().nullable(),
  color: yup.string().nullable(),
  weight: yup.number()
    .typeError('Weight must be filled out and non-negative')
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
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ItemFormData>({
    resolver: yupResolver(schema),
    defaultValues: editingItem
  });

  const [color, setColor] = React.useState<string>(editingItem?.color || '#ff0000');
  const [formError, setFormError] = React.useState<string | null>(null);

  const addItem = usePaccurateStore(state => state.addItem);
  const updateItem = usePaccurateStore(state => state.updateItem);

  const onSubmit: SubmitHandler<ItemFormData> = (data) => {
    const itemData = { ...data, color, refId: data.refId || undefined };
    if (itemData.refId === undefined) {
      delete itemData.refId;
    }
    let result;
    if (editingItem && editingItem.refId !== null && editingItem.refId !== undefined) {
      result = updateItem(editingItem.refId, itemData);
    } else {
      result = addItem(itemData);
    }
    console.log(result);
    if (result && 'error' in result) {
      setFormError(result.error);
      setError('refId', { type: 'manual', message: result.error });
    } else {
      onClose();
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        {formError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
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

        <Flex justifyContent="flex-end" width="100%">
          <Button type="submit" bg="purple.600" color="white" _hover={{ bg: 'purple.800' }} fontSize="sm">
            {editingItem ? 'Update' : 'Add'} Item
          </Button>
        </Flex>
      </VStack>
    </form>
  );
};