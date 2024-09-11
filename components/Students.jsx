import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";

const CardStudent = ({ item }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.boxIndex}>
          <Text style={styles.textIndex}>{item.Id}</Text>
        </View>
        <View>
          <Text style={styles.textTitle}>
            {item.FirstName} {item.LastName}
          </Text>
          <Text style={styles.textDescription}>{item.Email}</Text>
        </View>
        <View style={styles.ageContainer}>
          <Text style={styles.ageText}>{item.Age}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", 
    marginBottom: 4,
  },
  textDescription: {
    fontSize: 14,
    color: "#777", 
  },
  textIndex: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  boxIndex: {
    flex: 1,
    maxWidth: 40,
    height: 40,
    backgroundColor: "#0e7490",
    justifyContent: "center",
    borderRadius: 100,
    alignItems: "center",
    marginRight: 20,
  },
  ageContainer: {
    position: "absolute",
    right: 20,
    backgroundColor: "#0e7490",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardStudent;
