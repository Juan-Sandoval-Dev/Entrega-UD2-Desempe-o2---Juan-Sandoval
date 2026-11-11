import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Producto } from "./src/types/producto";
import { obtenerProductos } from "./src/api/tiendaApi";
import { TarjetaProducto } from "./src/components/TarjetaProducto";
import { DetalleProducto } from "./src/components/DetalleProducto";
import { VistaCarga } from "./src/components/VistaCarga";
import { VistaError } from "./src/components/VistaError";

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [actualizando, setActualizando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const cargarDatos = useCallback(async (esRecarga: boolean = false) => {
    if (esRecarga) {
      setActualizando(true);
    } else {
      setCargando(true);
    }
    setError(null);

    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error al cargar los datos.");
      }
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const seleccionarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };

  const volverAlCatalogo = () => {
    setProductoSeleccionado(null);
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar style="dark" />

      {productoSeleccionado ? (
        <DetalleProducto
          producto={productoSeleccionado}
          alVolver={volverAlCatalogo}
        />
      ) : (
        <View style={estilos.contenedor}>
          <View style={estilos.encabezado}>
            <Text style={estilos.titulo}>Catálogo de Productos</Text>
          </View>

          {cargando && !actualizando ? (
            <VistaCarga mensaje="Cargando productos..." />
          ) : error && productos.length === 0 ? (
            <VistaError
              mensaje={error}
              alReintentar={() => cargarDatos(false)}
            />
          ) : (
            <FlatList
              data={productos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TarjetaProducto
                  producto={item}
                  alPresionar={seleccionarProducto}
                />
              )}
              contentContainerStyle={estilos.lista}
              refreshing={actualizando}
              onRefresh={() => cargarDatos(true)}
              ListEmptyComponent={
                <View style={estilos.vacio}>
                  <Text style={estilos.textoVacio}>
                    No hay productos disponibles.
                  </Text>
                </View>
              }
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  encabezado: {
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  lista: {
    padding: 10,
  },
  vacio: {
    padding: 20,
    alignItems: "center",
  },
  textoVacio: {
    fontSize: 14,
    color: "#666",
  },
});
