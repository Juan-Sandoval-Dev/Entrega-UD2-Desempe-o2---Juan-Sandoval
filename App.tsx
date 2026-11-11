import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Product } from './src/types/product';
import { getProducts } from './src/api/fakeStoreApi';
import { ProductCard } from './src/components/ProductCard';
import { ProductDetail } from './src/components/ProductDetail';
import { LoadingView } from './src/components/LoadingView';
import { ErrorView } from './src/components/ErrorView';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Carga los productos desde Fake Store API mediante Axios
   * y los almacena una vez transformados por el mapper.
   */
  const loadProducts = useCallback(async (isPullToRefresh: boolean = false) => {
    if (isPullToRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado al procesar la solicitud.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Selección de producto para ver detalle
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  // Regreso a la lista de productos
  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Requerimiento 5: Vista de detalle al pulsar una tarjeta */}
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={handleBackToList}
        />
      ) : (
        <View style={styles.container}>
          {/* Cabecera de la aplicación */}
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>UNTRM • PAM UD2</Text>
            <Text style={styles.headerTitle}>Catálogo de Productos</Text>
          </View>

          {/* Requerimiento 2: Indicador de carga */}
          {loading && !refreshing ? (
            <LoadingView message="Obteniendo productos de Fake Store API..." />
          ) : error && products.length === 0 ? (
            /* Requerimiento 2: Mensaje legible ante fallo con reintento */
            <ErrorView message={error} onRetry={() => loadProducts(false)} />
          ) : (
            /* Requerimiento 4: Lista desplazable de tarjetas (imagen, nombre, precio) */
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={handleSelectProduct}
                />
              )}
              contentContainerStyle={styles.listContent}
              refreshing={refreshing}
              onRefresh={() => loadProducts(true)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay productos disponibles.</Text>
                </View>
              }
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
  },
});
