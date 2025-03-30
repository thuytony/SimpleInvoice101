import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Modal, List, Button, SegmentedButtons } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InvoiceFilter as InvoiceFilterType } from '../../types/invoice.types';
import { INVOICE_STATUSES, SORT_OPTIONS, ORDER_OPTIONS } from '../../constants';
interface Props {
  visible: boolean;
  onDismiss: () => void;
  filters: InvoiceFilterType;
  onFilterChange: (filters: InvoiceFilterType) => void;
  onApply: () => void;
}

export const InvoiceFilter = ({ visible, onDismiss, filters, onFilterChange, onApply }: Props) => {
  const handleDateChange = (date: Date, dateType: 'from' | 'to') => {
    const formattedDate = date.toISOString().split('T')[0];
    onFilterChange({
      ...filters,
      [dateType === 'from' ? 'fromDate' : 'toDate']: formattedDate
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <List.Section>
          <List.Subheader>Status</List.Subheader>
          {INVOICE_STATUSES.map((status) => (
            <List.Item
              key={status.value}
              title={status.label}
              onPress={() => onFilterChange({ ...filters, status: status.value })}
              right={props => 
                filters.status === status.value ? 
                <List.Icon {...props} icon="check" /> : null
              }
            />
          ))}

          <List.Subheader>Sort By</List.Subheader>
          <SegmentedButtons
            value={filters.sortBy}
            onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
            buttons={SORT_OPTIONS}
          />

          <List.Subheader>Order</List.Subheader>
          <SegmentedButtons
            value={filters.ordering}
            onValueChange={(value) => 
              onFilterChange({ ...filters, ordering: value as 'ASCENDING' | 'DESCENDING' })}
            buttons={ORDER_OPTIONS}
          />

          <List.Subheader>Date Range</List.Subheader>
          <List.Item
          title="From Date"
          right={() => <DateTimePicker
            value={new Date(filters.fromDate || new Date())}
            mode="date"
            display="compact"
            onChange={(_, date) => date && handleDateChange(date, 'from')}
          />}
            />
            <List.Item
          title="To Date"
          right={() => <DateTimePicker
            value={new Date(filters.toDate || new Date())}
            mode="date"
            display="compact"
            onChange={(_, date) => date && handleDateChange(date, 'to')}
          />}
            />
        </List.Section>

        <Button mode="contained" onPress={onApply}>
          Apply Filters
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 24,
    borderRadius: 8,
  },
}); 