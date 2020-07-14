import React, {useState} from 'react';
import '../student.css'
import OnEvent from "react-onevent";

const Student = (props) => {

    const [showPlus, setShowPlus] = useState(true);
    const [showMins, setShowMinus] = useState(false);
    const [displayTest, setDisplayTest] = useState(false);
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    let tagList = [];
    let gradeList = [];


    const getAverage = (arr) =>{
        let sum = 0;
        for (let i = 0; i< arr.length; i++){
            sum += parseInt(arr[i]);
        }
    return (sum / arr.length);
    }

    const toggle = () => {
        setShowMinus(!showMins);
        setShowPlus(!showPlus);
        setDisplayTest(!displayTest);
    }


    const displayTag = (event) => {
        setInput(event.target.value);
        
    } 

     const addTag = (tag) => {
         let newTags = [...tags, tag]
        setTags(newTags);

        if (! (tags.indexOf(tag) > -1)) {
            
        }
     }

    gradeList = props.grades.map((grade, index) => (
        <ul>
            <li key={index}>
                Test {index}: {'    '} {grade} %;
            </li>
        </ul>
        
    ));

    tagList = tags.map(tag => (
        <li className='tag'>
            {tag}
        </li>
    ));

    
    return(
        <div className='each-student'>
            <img src={props.pic} alt="student avatar" />
            <div className='button'>
                {showPlus && (<button onClick={toggle}> + </button>)}
                {showMins && (<button onClick={toggle}> - </button>)}
            </div>
            <div className='student-info'>
                <ul>
                    <li className="student-name">
                        {props.firstName} {props.lastName}
                    </li>
                    <li>Email: {props.email}</li>
                    <li>Company: {props.company}</li>
                    <li>Skill: {props.skill}</li>
                    <li>Average: {getAverage(props.grades)}%</li>
                </ul>

                {displayTest && (
                    <div className = 'test-score'>
                        {gradeList}
                        <ul>
                        {tagList}
                        </ul>
                        <OnEvent enter = {(event) => {addTag(event.target.value)}}>
                            <input type='text' 
                            placeholder ="Enter tag..."
                            id='add-tag-input'
                            value = {input}
                            onChange = {displayTag}/>
                        </OnEvent>
                        
                    </div>
                )}
                
            </div> 
            
        </div>
    )
}

export default Student;