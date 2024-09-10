// services/studentService.js
import { useSQLiteContext } from "expo-sqlite";

const useStudentsService = () => {
  const db = useSQLiteContext();

  const getStudents = async () => {
    try {
      const allStudent = await db.getAllAsync("SELECT * FROM Students");
      return allStudent;
    } catch (error) {
      console.log("Error al hacer el get: ", error);
      throw error;
    }
  };

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
    } catch (error) {
      console.log("Error al crear un estudiante: ", error);
      throw error;
    }
  };

  const deleteStudents = async () => {
    try {
      const statement = await db.runAsync("DELETE FROM Students");
    } catch (error) {
      console.log("Error al borrar los estudiantes: ", error);
      throw error;
    }
  };

  return {
    getStudents,
    addStudent,
    deleteStudents,
  };
};

export default useStudentsService;
