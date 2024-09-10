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
import useStudentsService from "../services/studentsServices";
import CardStudent from './CardStudent';

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
          placeholder="First Name"
          value={newStudent.FirstName}
          onChangeText={(text) => handleInputChange("FirstName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newStudent.LastName}
          onChangeText={(text) => handleInputChange("LastName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
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
        <Button title="Add Student" onPress={handleAddStudent} />
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
  },
  form: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default StudentList;
