import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const PaymentOptionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-8 right-3"
          >
            <XCircleIcon color="#0ecb64" height={50} width={50} />
          </TouchableOpacity>

      <Text style={styles.title}>Choose Payment Method</Text>

      <TouchableOpacity 
        style={[styles.button, styles.cashButton]} 
        onPress={() => navigation.navigate('PreparingOrderScreen')}>
        <Text style={[styles.buttonText, styles.cashButtonText]}>Pay with Cash</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.onlineButton]} 
        onPress={() => navigation.navigate('OnlinePaymentScreen')}>
        <Text style={[styles.buttonText, styles.onlineButtonText]}>Pay Online</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ecb64',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cashButton: {
    backgroundColor: '#0ecb64',
  },
  onlineButton: {
    backgroundColor: 'white',
    borderColor: '#0ecb64',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cashButtonText: {
    color: 'white',
  },
  onlineButtonText: {
    color: '#0ecb64',
  },
});

export default PaymentOptionsScreen;
