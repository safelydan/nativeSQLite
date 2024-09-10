// Index.js
import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import StudentList from "../components/StudentList";

async function initializeDatabase(db) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Students (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT,
        LastName TEXT,
        Age INTEGER,
        Email TEXT
      )
    `);
    console.log("O banco de dados se inicializou corretamente");
  } catch (error) {
    console.log("Erro ao inicializar o banco de dados: ", error);
  }
} 

export default function Index() {
  return (
    <SQLiteProvider databaseName="mydb.db" onInit={initializeDatabase}>
      <View style={styles.container}>
        <StudentList />
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})