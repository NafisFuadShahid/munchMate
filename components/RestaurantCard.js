import { ChevronDownIcon, UserIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon,StarIcon } from 'react-native-heroicons/solid';
import { View,Text,ScrollView, TouchableOpacity,Image } from "react-native";
import React from "react";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard =({id,imgUrl, title,rating,genre,address,short_description,dishes,long,lat}) =>{
  const navigation = useNavigation();
  return (
     <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
      className="bg-white mr-3 shadow"
    >
      <Image source ={{
        uri: urlFor(imgUrl).url(),
      }}
      className = "h-36 w-64 rounded-sm"/>

      <View className = "px-.4 pb-4">
        <Text className= "font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row item-center space-x-1">
          <StarIcon color = "green" opacity ={0.5} size={22}/>
            <View style = {{marginTop: 2.5}}>
              <Text className = "text-xs text-gray-500"> 
              <Text className = "text-green-500">{rating} {'\u00B7'} </Text> 
              {genre}</Text>
           </View>
        </View>
        <View className = "flex-row item-center space-x-1">
          <MapPinIcon color = "gray" opacity = {0.4} size= {22} />
          <View style = {{marginTop:2.5}}>
            <Text className = "text-xs text-gray-500">Nearby {'\u00B7'} {address}</Text>
          </View>
        </View>
      </View>
     </TouchableOpacity>
  );
};

export default RestaurantCard;