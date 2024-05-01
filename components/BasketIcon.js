import { useNavigation } from "@react-navigation/native";
import React from "react";
//import Currency from "react-currency-formatter";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";

export default function BasketIcon() {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  //console.log(basketTotal);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#0ecb64] p-2 rounded-lg flex-row" // Adjusted padding here
      >
        <Text className="text-white font-extrabold text-lg bg-[#0a914b] py-2 px-2 rounded-full">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center py-2">
          View Basket
        </Text>
        <Text className="text-ld text-white font-extrabold py-3.5">
          <Text>{basketTotal} BDT</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
