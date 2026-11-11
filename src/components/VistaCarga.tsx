import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface PropsCarga {
  mensaje?: string;
}

export const VistaCarga: React.FC<PropsCarga> = ({
  mensaje = 'Cargando...',
}) => {
  return (
    <View style={estilos.contenedor}>
      <ActivityIndicator size="large" color="#0066cc" />
      <Text style={estilos.texto}>{mensaje}</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  texto: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
