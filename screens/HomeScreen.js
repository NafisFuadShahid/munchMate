import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronDownIcon, UserIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/solid';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...
        }
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  useEffect(() => {
    // Filter restaurants based on search query
    const filtered = featuredCategories.filter(category =>
      category.restaurants.some(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, featuredCategories]);

  const handleLogout = () => {
    // Perform logout actions here
    // For now, just navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', paddingBottom: 3, paddingHorizontal: 13 }}>
        <Image
          source={require('../assets/mainlogo2.png')}
          style={{ height: 28, width: 28, backgroundColor: '#CCC', padding: 8, borderRadius: 14, marginRight: 7 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', color: '#666', fontSize: 12 }}>Savor Every Delivery!</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Current Location</Text>
            <ChevronDownIcon size={20} color="#0ecb64" style={{ marginLeft: 5 }} />
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
          <UserIcon size={30} color="#0ecb64" />
        </TouchableOpacity>
      </View>

      {/* Logout Bar */}
      {showLogout && (
        <View style={{ paddingHorizontal: 13, paddingVertical: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={handleLogout}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333', marginRight: 10 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, paddingBottom: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5E5E5', padding: 8, borderRadius: 8 }}>
          <MagnifyingGlassIcon color="gray" style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            keyboardType="default"
            placeholder="Restaurants and cuisines"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <AdjustmentsVerticalIcon size={24} color="#0ecb64" style={{ marginLeft: 10 }} />
      </View>

      {/* Body */}
      <ScrollView style={{ flex: 1 }}>
        {/* Categories */}
        <Categories />
        {filteredRestaurants.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

        {/* Add your featured content here */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
