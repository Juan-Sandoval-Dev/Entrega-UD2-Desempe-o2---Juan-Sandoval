import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PropsError {
  mensaje: string;
  alReintentar: () => void;
}

export const VistaError: React.FC<PropsError> = ({ mensaje, alReintentar }) => {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Error</Text>
      <Text style={estilos.mensaje}>{mensaje}</Text>
      <TouchableOpacity style={estilos.boton} onPress={alReintentar}>
        <Text style={estilos.textoBoton}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cc0000",
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  boton: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
