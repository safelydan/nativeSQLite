import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
    console.log("La base de datos se inicializo correctamente");
  } catch (error) {
    console.log("Error al inicializar la base de datos: ", error);
  }
}

export default function App() {
  return (
    <SQLiteProvider databaseName="mydb2.db" onInit={initializeDatabase}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de estudantes</Text>
        <Content />
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
  );
}

const Content = () => {
  const db = useSQLiteContext();

  const [students, setStudents] = useState([]);

  //function to get the students
  const getStudents = async () => {
    try {
      const allStudent = await db.getAllAsync("SELECT * FROM Students");
      setStudents(allStudent);
    } catch (error) {
      console.log("Error al hacer el get: ", error);
    }
  };

  //function to add a student
  const addStudent = async (newStudent) => {
    try {
      const statement = await db.prepareAsync(
        "INSERT INTO Students (FirstName, LastName, Age, Email) VALUES (?,?,?,?)"
      );
      await statement.executeAsync([
        newStudent.FirstName,
        newStudent.LastName, 
        newStudent.Age, 
        newStudent.Email,
      ]);
      await getStudents();
    } catch (error) {
      console.log("Error al crear un estudiante: ", error);
    }
  };

  useEffect(() => {
    addStudent({
      FirstName: "Kevin",
      LastName: "Sanchez",
      Age: '24',
      Email: "lordkevin@gmail.com",
    });
    getStudents();
  }, []);

  return (
    <View>
      {students.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 30 }} size={"large"} />
      ) : (
        <FlatList
          data={students}
          style={{ maxHeight: 500 }}
          renderItem={({ item }) => (
            <Text style={{color: 'black'}}>
              {item.Id} - {item.LastName}
            </Text>
      )}
          keyExtractor={(item) => item.Id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
