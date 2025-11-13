import { Text, View } from "react-native";

import { useEffect, useState } from "react";
import { getCategory } from "@/services/category.service";
import { Category } from "@/types/category";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      {categories.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
};
export default Home;
