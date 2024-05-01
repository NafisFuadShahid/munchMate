import { View,Text,ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import sanityClient, { urlFor } from "../sanity";

const Categories =() =>{
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView 
    contentContainerStyle = {{
      paddingTop:10,
      paddingHorizontal:15,
    }}
    horizontal showsHorizontalScrollIndicator = {false}>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
      {/* CategoryCard */}
      
    </ScrollView>
  )
}

export default Categories;