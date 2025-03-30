import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';
import { Invoice } from '../../types/invoice.types';

interface Props {
  invoice: Invoice;
  onPress: () => void;
}

export const InvoiceItem = ({ invoice, onPress }: Props) => {
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
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.invoiceNumber}>
          {invoice.invoiceNumber}
        </Text>
        
        <Text variant="bodyMedium" style={styles.customerName}>
          {invoice.customer 
            ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
            : 'No Customer'
          }
        </Text>

        <Text variant="titleLarge" style={styles.amount}>
          {invoice.currencySymbol}{invoice.totalAmount.toFixed(2)}
        </Text>

        <Text variant="bodySmall" style={styles.date}>
          Due: {new Date(invoice.dueDate).toLocaleDateString()}
        </Text>

        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: getStatusColor(invoice.status.find(s => s.value)?.key || '') }
          ]}
          textStyle={styles.statusText}
        >
          {invoice.status.find(s => s.value)?.key || 'Unknown'}
        </Chip>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
    marginBottom: 8,
    elevation: 2,
  },
  content: {
    position: 'relative',
    paddingVertical: 12,
  },
  invoiceNumber: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  customerName: {
    marginBottom: 8,
    color: '#666',
  },
  amount: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#666',
    marginBottom: 8,
  },
  statusChip: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
}); 