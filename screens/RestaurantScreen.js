import React, { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { urlFor } from "../sanity";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleReservationPress = () => {
    navigation.navigate("Reservation"); // Navigate to the "Reservation" screen
  };

  return (
    <>
      <BasketIcon/>
      <ScrollView className="py-8">
        <View>
          <Image source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4" />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon height={20} width={20} color="#0ecb64" />
          </TouchableOpacity>
          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="flex-row item-center space-x-1">
                  <StarIcon color="green" opacity={0.5} size={22}/>
                  <Text className="text-xs text-gray-500 py-1">
                    <Text className="text-green-500">{rating}</Text> {'\u00B7'} {genre}
                  </Text>
                </View>
                <View className="flex-row item-center space-x-1">
                  <View style={{ marginTop:2 }}>
                    <MapPinIcon color="gray" opacity={0.4} size={22} />
                  </View>
                  <Text className="text-xs text-gray-500 py-1">
                    <Text className="text-xs text-gray-500">{address}</Text>
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-4">
                {short_description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleReservationPress} // Call handleReservationPress on press
            className="flex-row bg-white items-center space-x-2 p-4 border-y border-gray-300"
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
            <Text className="pl-2 flex-1 text-md font-bold">Book a reservation</Text>
            <ChevronRightIcon color="#0ecb64" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-3 mb-3 font-bold text-xl">Menu</Text>
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

export default RestaurantScreen;
