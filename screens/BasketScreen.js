import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupItemsInBucket, setGroupItemsInBucket] = useState([]);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupItemsInBucket(groupItems);
  }, [items]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Scrollable Content */}
      <ScrollView className="bg-gray-100 flex-1">
        <View className="p-5 border-b border-[#0ecb64] bg-white shadow-xs">
          <Text className="text-lg font-bold text-center">Basket</Text>
          <Text className="text-center text-gray-400">{restaurant.title}</Text>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#0ecb64" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{ uri: "https://www.pngitem.com/pimgs/m/533-5338534_motor-21-philosophychicchic-home-delivery-service-bike-hd.png" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text className="text-[#0ecb64]">Change</Text>
          </TouchableOpacity>
        </View>
        {Object.entries(groupItemsInBucket).map(([key, items]) => (
          <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text className="text-[#0ecb64]">{items.length} x</Text>
            <Image source={{ uri: urlFor(items[0]?.image).url() }}
              className="h-12 w-12 rounded-full"
            />
            <Text className="flex-1">{items[0]?.name}</Text>
            <Text className="text-gray-600">{items[0]?.price} BDT</Text>
            <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
              <Text className="text-[#FF0000] text-xs">Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Fixed Footer */}
      <View className="p-5 bg-white mt-3 space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">SubTotal</Text>
          <Text className="text-gray-400">{basketTotal} BDT</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Delivery Fee</Text>
          <Text className="text-gray-400">150 BDT</Text>
        </View>
        <View className="flex-row justify-between">
          <Text>Order Total</Text>
          <Text className="font-extrabold">{basketTotal + 150} BDT</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentOptionsScreen")}
          className="rounded-lg bg-[#0ecb64] p-4"
        >
          <Text className="text-center text-white text-lg font-bold">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BasketScreen;
