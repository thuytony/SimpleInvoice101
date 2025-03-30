import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { useInvoices } from '../../hooks/useInvoices';
import { InvoiceItem } from '../../components/invoice/InvoiceItem';
import { InvoiceFilter } from '../../components/invoice/InvoiceFilter';
import { LoadingSpinner } from '../../components/common';
import { Invoice } from '../../types/invoice.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';
import debounce from 'lodash/debounce';
import { RootStackParamList } from '../../navigation/index';
import { InvoiceFilter as InvoiceFilterType } from '../../types/invoice.types';

type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Invoices'>;
};

const InvoiceListScreen = ({ navigation }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<InvoiceFilterType>({
    status: '',
    sortBy: 'CREATED_DATE',
    ordering: 'DESCENDING' as 'ASCENDING' | 'DESCENDING',
    keyword: '',
    fromDate: '',
    toDate: '',
  });
  const [tempFilters, setTempFilters] = useState<InvoiceFilterType>({
    status: '',
    sortBy: 'CREATED_DATE',
    ordering: 'DESCENDING' as 'ASCENDING' | 'DESCENDING',
    keyword: '',
    fromDate: '',
    toDate: '',
  });
  const pageRef = useRef(1);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedQuery(text);
      pageRef.current = 1;
      refetch();
    }, 1500),
    []
  );

  const { data, isLoading, isFetching, refetch } = useInvoices({
    pageNum: pageRef.current,
    pageSize: 10,
    keyword: debouncedQuery,
    sortBy: filters.sortBy,
    ordering: filters.ordering,
    status: filters.status,
    fromDate: filters.fromDate,
    toDate: filters.toDate,
  });

  useEffect(() => {
    if (data?.data) {
      if (pageRef.current === 1) {
        setAllInvoices(data.data);
      } else {
        setAllInvoices(prev => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const renderItem = ({ item }: { item: Invoice }) => (
    <InvoiceItem
      invoice={item}
      onPress={() => navigation.navigate('InvoiceDetail', { invoice: item })}
    />
  );

  const handleLoadMore = () => {
    const totalRecords = data?.paging?.totalRecords;
    const pageSize = data?.paging?.pageSize;
    
    if (!isFetching && totalRecords && pageSize && totalRecords > pageRef.current * pageSize) {
      pageRef.current += 1;
      refetch(); // Fetch next page
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    pageRef.current = 1;
    await refetch();
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text); // Update input immediately
    debouncedSearch(text); // Debounce API call
  };

  const handleFilterApply = () => {
    setFilters(tempFilters);
    setShowFilterModal(false);
    pageRef.current = 1;
    refetch();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    pageRef.current = 1;
    refetch();
  };

  if (isLoading &&pageRef.current === 1) return <LoadingSpinner />;

  return (
    <View style={styles.container} testID='invoice-list'>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search invoices..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          onClearIconPress={handleClearSearch}
        />
        <IconButton
          icon="filter-variant"
          onPress={() => setShowFilterModal(true)}
        />
      </View>

      <InvoiceFilter
        visible={showFilterModal}
        onDismiss={() => {
          setTempFilters(filters);
          setShowFilterModal(false);
        }}
        filters={tempFilters}
        onFilterChange={setTempFilters}
        onApply={handleFilterApply}
      />

      <FlatList
        data={allInvoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.invoiceId}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={() => (isLoading &&pageRef.current > 1) ? <LoadingSpinner /> : null}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateInvoice')}
        testID='create-invoice-fab'
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
  },
  flatList: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
  },
});

export default InvoiceListScreen;