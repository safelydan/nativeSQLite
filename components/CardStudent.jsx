import React from "react";
import {
    Text,
    Pressable,
    StyleSheet,
    View,
  } from "react-native";

const CardStudent = ({item}) => {
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
        <View style={{ position: "absolute", right: 30 }}>
          <Text style={{ color: "#0e7490", fontSize: 25 }}>{item.Age}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: "#e2e8f0",
      padding: 20,
      margin: 10,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    textTitle: {
      fontSize: 20,
    },
    textDescription: {
      fontSize: 15,
    },
    textIndex: {
      fontSize: 20,
      color: "white",
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
  });

export default CardStudent;
