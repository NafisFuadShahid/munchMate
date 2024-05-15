import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";

const DeliveryScreen=()=> {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  //console.log(restaurant.long);

  return (
    <View className="bg-[#0ecb64] flex-1">
      <SafeAreaView className="z-50">
        <View  className="flex-row justify-between items-center p-7">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon className = "py-5" color="white" size={40} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-5 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={require('../assets/time.gif')}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#0ecb64" indeterminate={true} />
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#0ecb64"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={require('../assets/kalorider.jpg')}
          className="h-12 w-12 bg-gray-300 p-7 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Shadab Tanjeed</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text style={{ color: '#0ecb64', fontSize: 18, marginRight: 10 }}className="text-[#0ecb64] text-lg mr">Call</Text>
      </SafeAreaView>
    </View>
  );
}

export default DeliveryScreen;