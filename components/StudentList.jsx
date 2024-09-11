// components/StudentList.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Button,
  View,
} from "react-native";
import useStudentsService from "../controller/studentController";
import CardStudent from './Students';

const StudentList = () => {
  const { getStudents, addStudent, deleteStudents } = useStudentsService();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",
  });

  const handleInputChange = (name, value) => {
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    if (newStudent.FirstName && newStudent.LastName && newStudent.Age && newStudent.Email) {
      await addStudent(newStudent);
      const studentsData = await getStudents();
      setStudents(studentsData);
      setNewStudent({ FirstName: "", LastName: "", Age: "", Email: "" }); // Reset form
    } else {
      alert("Por favor complete todos os campos");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await getStudents();
      setStudents(studentsData);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Primeiro Nome"
          value={newStudent.FirstName}
          onChangeText={(text) => handleInputChange("FirstName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={newStudent.LastName}
          onChangeText={(text) => handleInputChange("LastName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={newStudent.Age}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange("Age", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newStudent.Email}
          onChangeText={(text) => handleInputChange("Email", text)}
        />
        <Pressable style={styles.buttonContainer} onPress={handleAddStudent}>
  <Text style={styles.buttonText}>Adicionar estudante</Text>
</Pressable>

      </View>

      {students.length === 0 ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <CardStudent item={item}/>
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
    padding: 16,
    backgroundColor: "#f4f4f9", // Cor de fundo clara para o container
  },
  form: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#f9f9f9", // Fundo dos inputs levemente mais claro
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#0e7490",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default StudentList;
