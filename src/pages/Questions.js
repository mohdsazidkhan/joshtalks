import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Questions() {
const dispatch = useDispatch()
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [activeQues, setActiveQues] = useState(null);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [visitedQues, setVisitedQues] = useState([0]);
  const [attemptedQues, setAttemtedQues] = useState([0]);
  
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleOption = (e,item) => {
    e.preventDefault();
    setAnswerSelected(true);
    setSelectedAnswer(item);
    setAttemtedQues([...attemptedQues, currentIndex])
    dispatch({ type: "ADD_ANSWER", payload: {question: activeQues?.question, userAns: item, correctAns: activeQues?.correct_answer}});
    if (item.toLowerCase() === activeQues?.correct_answer.toLowerCase()) {
      setScore(score+1);
    }
    if (currentIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);
        setCurrentIndex(currentIndex + 1);
        const aQues = questions.filter((item) => questions.indexOf(item) === currentIndex + 1);
        setActiveQues(...aQues);
        if(aQues?.length > 0){
            let answers = [...aQues[0]?.incorrect_answers];
            answers.splice(getRandomInt(aQues[0]?.incorrect_answers?.length),0,aQues[0]?.correct_answer);
            setOptions(answers);
        }
      }, 1000);
    }
    
    if(currentIndex+1 === questions.length){
      navigate('/report', {
        state: {
          score
        }
      })
    }
  };
  
  const handleNumber = (e, numberIndex) => {
    let newIndex = Number(numberIndex);
    setCurrentIndex(newIndex);
    setVisitedQues([...visitedQues, newIndex])
    let aQues = questions.filter((item) => questions.indexOf(item) === newIndex);
    setActiveQues(...aQues);
    let answers = [...aQues[0]?.incorrect_answers];
    answers.splice(getRandomInt(aQues[0]?.incorrect_answers?.length),0,aQues[0]?.correct_answer);
    setOptions(answers);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          navigate("/report");
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const baseURL = "https://opentdb.com/api.php";
  const amount = 15;
  
  const getQuestions = () => {
    try {
      axios.get(`${baseURL}?amount=${amount}`).then((response) => {
        if (response.status === 200) {
          let ques = response.data.results;
          setQuestions(response.data.results);
          let aQues = ques.filter((item) => ques.indexOf(item) === currentIndex);
          setActiveQues(...aQues);
          let answers = [...aQues[0]?.incorrect_answers];
          answers.splice(getRandomInt(aQues[0]?.incorrect_answers?.length),0,aQues[0]?.correct_answer);
          setOptions(answers);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getClass = (option) => {
    if (!answerSelected) {
      return ``;
    }
    if (option === activeQues?.correct_answer) {
      return `correct`;
    }
    if (option === selectedAnswer) {
      return `selected`;
    }
  };

  return (
    <div className="mainContent bg-gray-900 h-screen">
      <div className="sidebar p-1 md:p-4">
        {questions?.length > 0 ? 
        <div className="questionNo">
          {Object.keys(questions)?.map((item, index) => (
            <div
              className={`text-white number ${index === currentIndex ? "active" : "" || visitedQues?.includes(index) ? "visited" : "" || attemptedQues?.includes(index) ? "attempted visited" : ""}`}
              key={item}
              onClick={(e) => handleNumber(e, index)}
            >
              {Number(item) + 1}
            </div>
          ))}
        </div>
        :
        <div className="text-white">Loading...</div>
        }
      </div>
      <div className="content px-4 md:px-16 py-6">
        {questions?.length > 0 ? 
        <>
        <div className="flex justify-end mb-5">
          <span className="text-white text-xl font-bold timer">
            {minutes + ":" + seconds}
          </span>
        </div>

        <div
          className="question text-xl md:text-2xl font-bold text-white"
          dangerouslySetInnerHTML={{
            __html: currentIndex + 1 + ". " + activeQues?.question,
          }}
        />
        <ul className="options">
          {options?.map((item, index) => (
            <li
              key={index}
              onClick={(e)=>handleOption(e, item)}
              className={`text-white ${getClass(item)}`}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
        </>
        :
        <div className="text-white">Loading...</div>
        }
      </div>
    </div>
  );
}

export default Questions;
