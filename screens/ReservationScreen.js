import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReservationScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const scrollViewRef = useRef(null);

  const handleTableSelection = (people) => {
    setNumberOfPeople(people);
  };

  const handleBookNow = () => {
    console.log('Reservation button pressed');
    setNumberOfPeople(1);
    setCustomerName('');
    setCustomerMobile('');
    setCustomerEmail('');
  };

  const scrollToInput = (reactNode) => {
    scrollViewRef.current?.scrollTo({ y: reactNode, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <XCircleIcon color="black" size={35} />
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Reservation</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titleText}>Make a Reservation</Text>
            <Text style={styles.descriptionText}>
              Discover culinary delights and exceptional service at our restaurant. Indulge in a range of flavors from start to finish. Join us for an unforgettable dining experience.
            </Text>
            <View style={styles.buttonContainer}>
              {[[2, 'Table for 2'], [4, 'Table for 4'], [6, 'Table for 6'], [8, 'Table for 8']].map(([people, label]) => (
                <TouchableOpacity
                  key={people}
                  style={[
                    styles.tableButton,
                    numberOfPeople === people && styles.selectedTableButton
                  ]}
                  onPress={() => handleTableSelection(people)}
                >
                  <Text style={[
                    styles.tableButtonText,
                    numberOfPeople === people && styles.selectedTableButtonText
                  ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="gray"
              style={styles.input}
              value={customerName}
              onChangeText={setCustomerName}
              onFocus={(event) => {
                scrollToInput(event.nativeEvent.target);
              }}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="gray"
              style={styles.input}
              value={customerMobile}
              onChangeText={setCustomerMobile}
              keyboardType="phone-pad"
              onFocus={(event) => {
                scrollToInput(event.nativeEvent.target);
              }}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.input}
              value={customerEmail}
              onChangeText={setCustomerEmail}
              keyboardType="email-address"
              onFocus={(event) => {
                scrollToInput(event.nativeEvent.target);
              }}
            />
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBookNow}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: '#E0E0E1',
    marginBottom: 20,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  bookButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  tableButton: {
    backgroundColor: '#E0E0E1',
    width: '45%',
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTableButton: {
    backgroundColor: 'black',
  },
  tableButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTableButtonText: {
    color: 'white',
  },
});

export default ReservationScreen;
