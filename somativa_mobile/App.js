import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ColecaoScreen from './src/screens/ColecaoScreen';

export default function App() {
  return (
    <>
      <ColecaoScreen/>
      <StatusBar style="auto"/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
