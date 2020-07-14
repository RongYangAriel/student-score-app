import React, { useEffect, useState } from "react";
import axios from "axios";
import Student from './Student';
const StudentList = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [keyWord, setKeyWord] = useState('');
    let students = [];

    useEffect(() => {
        axios.get("https://www.hatchways.io/api/assessment/students")
        .then(
            res => {
            setStudentList(res.data.students)
            setIsLoaded(true)
            },
        (error) => {
            setError(error);
            setIsLoaded(true);
            }
        )
    }, [])

    const searchByNameHandler = e => {
            setKeyWord(e.target.value);
        };
    
    const searchStudentByName = (keyWord) => {
        return x => {
          return (
            x.firstName.toLowerCase().includes(keyWord.toLowerCase()) ||
            x.lastName.toLowerCase().includes(keyWord.toLowerCase()) ||
            !keyWord
          );
        };
    };


    students = studentList.filter(searchStudentByName(keyWord)).map( (student) => (      
        <Student
        key={student.id}
        id={student.id}
        pic={student.pic}
        firstName={student.firstName}
        lastName={student.lastName}
        email={student.email}
        company={student.company}
        skill={student.skill}
        grades={student.grades}
        tags={student.tags}
    />
    )
);
    return (
     <div>
    
        <div className="tagAndName">
            <form>
                <input
                type="text"
                id='name-input'
                onChange={searchByNameHandler}
                placeholder="Search by name..."
                value={keyWord}
                />
            </form>
            <form>
                <input
                type="text"
                id='tag-input'
                placeholder="Search by tag..."
                value={keyWord}
                />
            </form>
        </div>
         {students}
     </div>
    )
}

export default StudentList;