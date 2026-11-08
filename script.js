// Student Results Management System

// 1. Class and constructor
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // 2. Calculate average using reduce()
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // Grade boundaries are defined here because the assignment does not specify them.
  getGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }

  // Both conditions must be true for a student to pass.
  getFinalResult(average) {
    if (average >= 50 && this.attendance >= 75) return "ناجح";
    else return "يحتاج مراجعة";
  }
}

// 3. Four students, including students with averages between 40 and 49.
const studentsList = [
  new Student(1001, "Ahmed Ali", [45, 44, 46], 90),    // 45
  new Student(1002, "Mona Hassan", [48, 49, 47], 82), // 48
  new Student(1003, "Omar Samir", [76, 81, 79], 95),   // 78.67
  new Student(1004, "Sara Mahmoud", [92, 88, 95], 70)  // 91.67
];

console.log("========================================");
console.log("STUDENT RESULTS MANAGEMENT SYSTEM");
console.log("========================================");

// 5. Report for every student in the main array.
console.log("\n1) MAIN STUDENTS REPORT");
const studentsReport = studentsList.map((student) => {
  const average = student.calculateAverage();
  return {
    "Student ID": student.id,
    "Name": student.name,
    "Average": Number(average.toFixed(2)),
    "Grade": student.getGrade(average),
    "Attendance (%)": student.attendance,
    "Final Result": student.getFinalResult(average)
  };
});
console.table(studentsReport);

// 4. Filter students whose original averages are from 40 to 49.
console.log("\n2) MERCY COMMITTEE - ELIGIBLE STUDENTS");
const studentsNeedingMercy = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

// Add five mercy marks to each eligible student's average.
const mercyResults = studentsNeedingMercy.map((student) => {
  const originalAverage = student.calculateAverage();
  const revisedAverage = Math.min(originalAverage + 5, 100);
  return {
    id: student.id,
    name: student.name,
    originalAverage: Number(originalAverage.toFixed(2)),
    mercyMarks: 5,
    revisedAverage: Number(revisedAverage.toFixed(2))
  };
});
console.table(mercyResults);

// Sum revised averages using reduce().
const totalRevisedAverages = mercyResults.reduce(
  (total, student) => total + student.revisedAverage, 0
);

// Zero-division protection.
const mercyAverage = mercyResults.length > 0
  ? totalRevisedAverages / mercyResults.length
  : 0;

console.log("\n3) MERCY COMMITTEE SUMMARY");
console.log("Number of eligible students:", mercyResults.length);
console.log("Total revised averages:", Number(totalRevisedAverages.toFixed(2)));
if (mercyResults.length > 0) {
  console.log("Average after mercy marks:", Number(mercyAverage.toFixed(2)));
} else {
  console.log("No eligible students; average cannot be calculated.");
}
console.log("Note: Mercy results are a separate analysis; original student data is unchanged.");
console.log("========================================");
