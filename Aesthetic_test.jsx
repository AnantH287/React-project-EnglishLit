import axios from 'axios';
import React, { useState } from 'react'

const Aesthetic_test = () => {

    const [userAnswers,setUserAnswers]=useState({});
    const [score,setScore]=useState(null);
    const [error,setError]=useState('');

    const questionsForProthalamion = [
        {
            id: 1,
            question: "Who is the author of Prothalamion?",
            options: ["John Milton", "Edmund Spenser", "William Shakespeare", "John Donne"],
            correctAnswer: "Edmund Spenser"
        },
        {
            id: 2,
            question: "Prothalamion was written to celebrate what occasion?",
            options: [
                "A royal wedding",
                "The marriage of the Earl of Leicester",
                "The double marriage of two sisters",
                "The coronation of Queen Elizabeth"
            ],
            correctAnswer: "The double marriage of two sisters"
        },
        {
            id: 3,
            question: "In Prothalamion, which river does the poet mention prominently?",
            options: ["River Thames", "River Avon", "River Severn", "River Tyne"],
            correctAnswer: "River Thames"
        },
        {
            id: 4,
            question: "What type of poem is Prothalamion?",
            options: ["Epithalamium", "Sonnet", "Elegy", "Ode"],
            correctAnswer: "Epithalamium"
        },
        {
            id: 5,
            question: "Which literary device is used in the repeated line: 'Sweet Thames! run softly, till I end my song'?",
            options: ["Metaphor", "Alliteration", "Repetition", "Personification"],
            correctAnswer: "Repetition"
        },
        {
            id: 6,
            question: "The poet uses the image of swans to symbolize:",
            options: ["Purity and beauty", "Power and strength", "Wisdom and grace", "Freedom and peace"],
            correctAnswer: "Purity and beauty"
        },
        {
            id: 7,
            question: "What theme is central to Prothalamion?",
            options: ["Nature and celebration", "War and peace", "Loss and mourning", "Love and betrayal"],
            correctAnswer: "Nature and celebration"
        },
        {
            id: 8,
            question: "How does Prothalamion reflect Spenser's view of nature?",
            options: [
                "Nature is chaotic and wild.",
                "Nature is a peaceful and harmonious setting for human events.",
                "Nature is irrelevant to the poet’s themes.",
                "Nature is a symbol of political unrest."
            ],
            correctAnswer: "Nature is a peaceful and harmonious setting for human events."
        },
        {
            id: 9,
            question: "In Prothalamion, Spenser uses classical references. Which of the following is NOT a classical reference in the poem?",
            options: ["Naiads", "Nymphs", "Apollo", "Jupiter"],
            correctAnswer: "Jupiter"
        },
        {
            id: 10,
            question: "What tone best describes Prothalamion?",
            options: ["Melancholic", "Celebratory", "Angry", "Satirical"],
            correctAnswer: "Celebratory"
        }
    ];


    const userId=1;
    const subjectId=5;
    const fieldname='prothalamion';
//  console.log("First check the score",score);
 
    const handleOptionChange=(questionId,selectedOption)=>{
            setUserAnswers((previousAnswers)=>({
                ...previousAnswers,
                [questionId]:selectedOption,
            }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let calculateScore=0;

        questionsForProthalamion.forEach((question)=>{
            if(userAnswers[question.id]===question.correctAnswer){
                calculateScore++;
            }
        });
        setScore(calculateScore);
    
        console.log("This is the userId",userId)
        console.log("This is the subjectId",subjectId)
        console.log("This is the Score",calculateScore)
        console.log("This is the fieldName",fieldname)

        axios.post('http://localhost:3000/literature/marks',{
        userId,
        subjectId,
        score:calculateScore,
        fieldname,
    })

    .then((response)=>alert("Successfully Completed Your Test Kindly Check Your Profile"))
    .catch((err)=>{
            setError(`Error: ${err.response ? err.response.data.message : err.message}`);
        console.log("Failed send userId,subjectId,score and fieldname to backend",err.message)
    })
}
    
    return (
    <div>
        {error && <p>Error: {error}</p>}
            <h1>Prothalamion Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questionsForProthalamion.map((question)=>(
                    <div key={question.id} style={{marginBottom:"20px"}}>
                        <p>
                            <strong>Q{question.id}:{question.question}</strong>
                        </p>
                        {question.options.map((option) => (
                    <div key={option}>
                        <input
                         type="radio"
                        name={`question-${question.id}`}
                        id={`${question.id}-${option}`}
                        value={option}
                        onChange={() => handleOptionChange(question.id, option)}
                        />
                        <label htmlFor={`${question.id}-${option}`}>{option}</label>
                    </div>
                    ))}
                    </div>
                ))}
                <button type='submit'>Get Mark</button>
            </form>
            {score !== null && <h2>Your score: {score} / {questionsForProthalamion.length}</h2>}
    </div>
  )
}
export default Aesthetic_test