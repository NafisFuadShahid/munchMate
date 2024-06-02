import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { XCircleIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

const BkashPaymentScreen = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const createBkashPayment = async () => {
    setLoading(true);
    try {
      // Initiate bKash payment
      const response = await axios.post('https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/create', {
        amount: '100', // Example amount
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: 'Inv12345', // Example invoice number
        // other necessary fields
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_BKASH_TOKEN', // Use a valid bKash token
        },
      });

      setPaymentUrl(response.data.paymentUrl); // Assuming the response contains a payment URL
    } catch (error) {
      console.error('Error creating bKash payment', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState) => {
    // You can handle success/failure/cancel URLs here
    if (navState.url.includes('payment-success')) {
      console.log('Payment Success');
    } else if (navState.url.includes('payment-failure')) {
      console.log('Payment Failure');
    }
  };

  const handleGoBack = () => {
    setPaymentUrl(null);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0ecb64" />
          <Text style={styles.loadingText}>Loading payment page...</Text>
        </View>
      ) : paymentUrl ? (
        <View style={styles.webviewContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleGoBack}>
            <XCircleIcon color="#0ecb64" height={50} width={50} />
          </TouchableOpacity>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            style={styles.webview}
          />
        </View>
      ) : (
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-8 right-0"
          >
            <XCircleIcon color="#0ecb64" height={50} width={50} />
          </TouchableOpacity>
          <Text style={styles.title}>Choose Payment Method</Text>
          <TouchableOpacity style={[styles.button, styles.bkashButton]} onPress={createBkashPayment}>
            <Text style={[styles.buttonText, styles.bkashButtonText]}>Pay with bKash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.paypalButton]}>
            <Text style={[styles.buttonText, styles.paypalButtonText]}>Pay with PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.visaButton]}>
            <Text style={[styles.buttonText, styles.visaButtonText]}>Pay with Visa</Text>
          </TouchableOpacity>
          {/* Add more payment methods here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#0ecb64',
  },
  webviewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
  },
  paymentOptions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ecb64',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bkashButton: {
    backgroundColor: '#0ecb64',
  },
  bkashButtonText: {
    color: 'white',
  },
  paypalButton: {
    backgroundColor: '#0070ba',
  },
  paypalButtonText: {
    color: 'white',
  },
  visaButton: {
    backgroundColor: '#1a1f71',
  },
  visaButtonText: {
    color: 'white',
  },
});

export default BkashPaymentScreen;
