import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { invoiceDataSchema } from '../../validations/invoice.schema';
import { useCreateInvoice } from '../../hooks/useInvoices';
import { CreateInvoiceRequest, CreateInvoiceData } from '../../types/invoice.types';
import { LoadingSpinner } from '../../components/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type NavigationProps = {
  navigation: StackNavigationProp<any>;
};

const CreateInvoiceScreen = ({ navigation }: NavigationProps) => {
  const { mutate: createInvoice, isPending } = useCreateInvoice();
  
  const { control, handleSubmit, formState: { errors } } = useForm<CreateInvoiceData>({
    resolver: yupResolver(invoiceDataSchema),
    defaultValues: {
      customer: {
        firstName: '',
        lastName: '',
        contact: {
          email: '',
          mobileNumber: '+6597594971'
        }
      },
      currency: 'GBP',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      items: [{
        itemName: '',
        quantity: 1,
        rate: 0,
        itemReference: '#123456'
      }]
    }
  });

  const onSubmit = (data: CreateInvoiceData) => {
    const dataWithOtherFields = {
      ...data,
      items: data.items.map(item => ({
        ...item,
        itemReference: '#123456'
      }))
    };

    const request: CreateInvoiceRequest = {
      invoices: [dataWithOtherFields]
    };
    createInvoice(request, {
      onSuccess: () => {
        navigation.goBack();
      }
    });
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAwareScrollView 
      testID='create-invoice-scrollview'
      style={styles.container}
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Controller
        control={control}
        name="customer.firstName"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="First Name"
            value={value}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.customer?.firstName}
            testID='first-name'
          />
          <HelperText type="error" visible={!!errors.customer?.firstName}>
            {errors.customer?.firstName?.message}
          </HelperText>
          </>
        )}
      />
      
      <Controller
        control={control}
        name="customer.lastName"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Last Name"
            value={value}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.customer?.lastName}
            testID='last-name'
          />
          <HelperText type="error" visible={!!errors.customer?.lastName}>
            {errors.customer?.lastName?.message}
          </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="customer.contact.email"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Email"
            value={value}
            mode="outlined"
            onChangeText={onChange}
            keyboardType="email-address"
            error={!!errors.customer?.contact?.email}
            testID='email'
          />
          <HelperText type="error" visible={!!errors.customer?.contact?.email} testID='email-error'>
            {errors.customer?.contact?.email?.message}
          </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="items.0.itemName"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Item Name"
            value={value}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.items?.[0]?.itemName}
            testID='item-name'
          />
          <HelperText type="error" visible={!!errors.items?.[0]?.itemName}>
            {errors.items?.[0]?.itemName?.message}
          </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="items.0.quantity"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Quantity"
            value={String(value)}
            mode="outlined"
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            error={!!errors.items?.[0]?.quantity}
            testID='quantity'
          />
          <HelperText type="error" visible={!!errors.items?.[0]?.quantity}>
            {errors.items?.[0]?.quantity?.message}
          </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="items.0.rate"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Rate"
            value={String(value)}
            mode="outlined"
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            error={!!errors.items?.[0]?.rate}
            testID='rate'
          />
          <HelperText type="error" visible={!!errors.items?.[0]?.rate}>
            {errors.items?.[0]?.rate?.message}
          </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            label="Due Date"
            value={value}
            mode="outlined"
            onChangeText={onChange}
            placeholder="YYYY-MM-DD"
            error={!!errors.dueDate}
            testID='due-date'
          />
          <HelperText type="error" visible={!!errors.dueDate}>
            {errors.dueDate?.message}
          </HelperText>
          </>
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        style={styles.submitButton}
        testID='create-invoice-btn'
      >
        Create Invoice
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  }
});

export default CreateInvoiceScreen;