import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Producto } from "../types/producto";

interface PropsTarjeta {
  producto: Producto;
  alPresionar: (producto: Producto) => void;
}

export const TarjetaProducto: React.FC<PropsTarjeta> = ({
  producto,
  alPresionar,
}) => {
  return (
    <TouchableOpacity
      style={estilos.tarjeta}
      onPress={() => alPresionar(producto)}
    >
      <Image
        source={{ uri: producto.imagen }}
        style={estilos.imagen}
        resizeMode="contain"
      />
      <View style={estilos.info}>
        <Text style={estilos.categoria}>{producto.categoria}</Text>
        <Text style={estilos.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={estilos.precio}>S/.{producto.precio.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  imagen: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  categoria: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  precio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007700",
  },
});
