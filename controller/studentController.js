// services/studentService.js
import { useSQLiteContext } from "expo-sqlite";

const useStudentsController = () => {
  const db = useSQLiteContext();

  const getStudents = async () => {
    try {
      const allStudent = await db.getAllAsync("SELECT * FROM Students");
      return allStudent;
    } catch (error) {
      console.log("Erro ao fazer o get: ", error);
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
      console.log("Erro ao criar um estudiante: ", error);
      throw error;
    }
  };

  const deleteStudents = async () => {
    try {
      const statement = await db.runAsync("DELETE FROM Students");
    } catch (error) {
      console.log("Erro ao deletar um estudante: ", error);
      throw error;
    }
  };

  return {
    getStudents,
    addStudent,
    deleteStudents,
  };
};

export default useStudentsController;
