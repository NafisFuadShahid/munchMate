import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { XCircleIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import reservationImage from '../assets/res.png';

const ReservationScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [customerName, setCustomerName] = useState('');

  const handleIncrement = () => {
    setNumberOfPeople(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };

  const handleBookNow = () => {
    console.log('Reservation button pressed');
    setNumberOfPeople(0);
    setCustomerName(''); // Reset customer name after booking
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XCircleIcon color="black" size={35} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Reservation</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <Image
          source={reservationImage}
          style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 20 }}
        />
        <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Make a Reservation</Text>
        <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', marginHorizontal: 20, marginBottom: 20 }}>
          Discover culinary delights and exceptional service at our restaurant. Indulge in a range of flavors from start to finish. Join us for an unforgettable dining experience.
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={handleDecrement}>
            <MinusCircleIcon color="black" size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 20, marginHorizontal: 10 }}>{numberOfPeople}</Text>
          <TouchableOpacity onPress={handleIncrement}>
            <PlusCircleIcon color="black" size={30} />
          </TouchableOpacity>
        </View>
        {/* Name Input Bar */}
        <TextInput
          placeholder="Your Name"
          placeholderTextColor="gray"
          style={styles.input}
          value={customerName}
          onChangeText={setCustomerName}
        />
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
