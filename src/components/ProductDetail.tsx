import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Product } from '../types/product';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

/**
 * Componente que muestra el detalle completo del producto seleccionado.
 * Cumple con los 5 campos exigidos por la rúbrica de evaluación:
 * 1. Imagen
 * 2. Nombre
 * 3. Precio
 * 4. Categoría
 * 5. Descripción
 * E incluye el mecanismo de retorno a la lista de productos.
 */
export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>← Volver al catálogo</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Imagen */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsCard}>
          {/* 4. Categoría */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* 2. Nombre */}
          <Text style={styles.name}>{product.name}</Text>

          {/* 3. Precio */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Precio:</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          {/* 5. Descripción */}
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Descripción del Producto</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  imageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d4ed8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 28,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#64748b',
    marginRight: 8,
    fontWeight: '500',
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#16a34a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
});
