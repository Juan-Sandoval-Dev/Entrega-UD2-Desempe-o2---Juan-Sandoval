import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Producto } from "../types/producto";

interface PropsDetalle {
  producto: Producto;
  alVolver: () => void;
}

export const DetalleProducto: React.FC<PropsDetalle> = ({
  producto,
  alVolver,
}) => {
  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity style={estilos.botonVolver} onPress={alVolver}>
        <Text style={estilos.textoBoton}>{"< Volver"}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Image
          source={{ uri: producto.imagen }}
          style={estilos.imagen}
          resizeMode="contain"
        />
        <Text style={estilos.categoria}>{producto.categoria}</Text>
        <Text style={estilos.nombre}>{producto.nombre}</Text>
        <Text style={estilos.precio}>
          Precio: S/.{producto.precio.toFixed(2)}
        </Text>
        <Text style={estilos.subtitulo}>Descripción:</Text>
        <Text style={estilos.descripcion}>{producto.descripcion}</Text>
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  botonVolver: {
    padding: 12,
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textoBoton: {
    fontSize: 16,
    color: "#0066cc",
    fontWeight: "bold",
  },
  contenido: {
    padding: 16,
  },
  imagen: {
    width: "100%",
    height: 220,
    marginBottom: 16,
  },
  categoria: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007700",
    marginBottom: 14,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
