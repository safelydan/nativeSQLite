// components/StudentList.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import useStudentsService from "../services/studentsServices";
import CardStudent from './CardStudent'

const StudentList = () => {
  const { getStudents, addStudent, deleteStudents } = useStudentsService();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await addStudent({
        FirstName: "Daniel",
        LastName: "Sanchez",
        Age: 24,
        Email: "lordDaniel@gmail.com",
      });
      const studentsData = await getStudents();
      setStudents(studentsData);
    };

    fetchData();
  }, []);

  return (
    <View>
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



export default StudentList;
