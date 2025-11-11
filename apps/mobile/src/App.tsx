import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { getCategory } from "@/services/category.service";
import { useEffect, useState } from "react";
import { Category } from "./types/category";
import BottomMenu from "@/components/layout/BottomMenu";

export default function App() {
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 100, height: 100 }}
      />
      {categories.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
      <StatusBar style="auto" />
      <View style={styles.debug}>
        <Text>test</Text>
      </View>
      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  debug: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    marginTop: 20,
  },
});
