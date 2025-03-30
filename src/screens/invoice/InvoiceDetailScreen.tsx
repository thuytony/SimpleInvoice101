import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, Chip, Divider, useTheme } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { Invoice } from '../../types/invoice.types';
import { RootStackParamList } from '../../navigation';

type Props = {
  route: RouteProp<RootStackParamList, 'InvoiceDetail'>;
};

const InvoiceDetailScreen = ({ route }: Props) => {
  const { invoice } = route.params;
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue':
        return theme.colors.error;
      case 'Due':
        return theme.colors.tertiary;
      case 'Paid':
        return theme.colors.secondary;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="headlineMedium">{invoice.invoiceNumber}</Text>
            {invoice.status.map(s => s.value && (
              <Chip
                key={s.key}
                style={[styles.statusChip, { backgroundColor: getStatusColor(s.key) }]}
                textStyle={{ color: 'white' }}
              >
                {s.key}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium">Customer Details</Text>
            <Text variant="bodyLarge">
              {invoice.customer ? `${invoice.customer.firstName} ${invoice.customer.lastName}` : 'No Customer'}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium">Amount Details</Text>
            <Text variant="headlineMedium" style={styles.amount}>
              {invoice.currencySymbol}{invoice.totalAmount.toFixed(2)}
            </Text>
            <View style={styles.row}>
              <Text variant="bodyMedium">Sub Total:</Text>
              <Text variant="bodyMedium">{invoice.currencySymbol}{invoice.invoiceSubTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text variant="bodyMedium">Tax:</Text>
              <Text variant="bodyMedium">{invoice.currencySymbol}{invoice.totalTax.toFixed(2)}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium">Dates</Text>
            <View style={styles.row}>
              <Text variant="bodyMedium">Created Date:</Text>
              <Text variant="bodyMedium">{invoice.createdAt}</Text>
            </View>
            <View style={styles.row}>
              <Text variant="bodyMedium">Due Date:</Text>
              <Text variant="bodyMedium">{invoice.dueDate}</Text>
            </View>
          </View>

          {invoice.description && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium">Notes</Text>
                <Text variant="bodyMedium">{invoice.description}</Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusChip: {
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    gap: 8,
  },
  amount: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InvoiceDetailScreen;
