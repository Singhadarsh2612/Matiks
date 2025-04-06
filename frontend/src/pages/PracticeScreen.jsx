import { useState, useEffect, useRef } from 'react'
import DigitDisplay from '../components/DigitDisplay'
import Timer from '../components/Timer'
import ExpressionInput from '../components/ExpressionInput'
import ResultDisplay from '../components/ResultDisplay'
import ButtonGroup from '../components/ButtonGroup'
// import "./Practice.css";
// 🔢 Inline JSON with digit-expression pairs
const problems = {
    "seq1": {
        "sequence": "249384",
        "solution": "2 \u00d7 (49 + 3 \u2013 8/4) = 100"
    },
    "seq2": {
        "sequence": "248484",
        "solution": "2 \u00d7 (48 + 4 \u2013 8/4) = 100"
    },
    "seq3": {
        "sequence": "247584",
        "solution": "2 \u00d7 (47 + 5 \u2013 8/4) = 100"
    },
    "seq4": {
        "sequence": "246684",
        "solution": "2 \u00d7 (46 + 6 \u2013 8/4) = 100"
    },
    "seq5": {
        "sequence": "245784",
        "solution": "2 \u00d7 (45 + 7 \u2013 8/4) = 100"
    },
    "seq6": {
        "sequence": "244884",
        "solution": "2 \u00d7 (44 + 8 \u2013 8/4) = 100"
    },
    "seq7": {
        "sequence": "243984",
        "solution": "2 \u00d7 (43 + 9 \u2013 8/4) = 100"
    },
    "seq8": {
        "sequence": "245682",
        "solution": "2 \u00d7 (45 + 8 \u2013 6/2) = 100"
    },
    "seq9": {
        "sequence": "333253",
        "solution": "3 \u00d7 (33 + 2 \u2013 5/3) = 100"
    },
    "seq10": {
        "sequence": "423484",
        "solution": "4 \u00d7 (23 + 4 \u2013 8/4) = 100"
    },
    "seq11": {
        "sequence": "424363",
        "solution": "4 \u00d7 (24 + 3 \u2013 6/3) = 100"
    },
    "seq12": {
        "sequence": "518484",
        "solution": "5 \u00d7 (18 + 4 \u2013 8/4) = 100"
    },
    "seq13": {
        "sequence": "517563",
        "solution": "5 \u00d7 (17 + 5 \u2013 6/3) = 100"
    },
    "seq14": {
        "sequence": "516642",
        "solution": "5 \u00d7 (16 + 6 \u2013 4/2) = 100"
    },
    "seq15": {
        "sequence": "712986",
        "solution": "((7 \u00d7 12) \u2013 9) \u00d7 (8/6) = 100"
    },
    "seq16": {
        "sequence": "812264",
        "solution": "8 \u00d7 (12 + 2 \u2013 6/4) = 100"
    },
    "seq17": {
        "sequence": "813164",
        "solution": "8 \u00d7 (13 + 1 \u2013 6/4) = 100"
    },
    "seq18": {
        "sequence": "912833",
        "solution": "((9 \u00d7 12) \u2013 8) \u00d7 (3/3) = 100"
    },
    "seq19": {
        "sequence": "516723",
        "solution": "5 \u00d7 (16 + 7 \u2013 6/2) = 100"
    },
    "seq20": {
        "sequence": "612773",
        "solution": "6 \u00d7 (12 + 7 \u2013 7/3) = 100"
    },
    "seq21": {
        "sequence": "613673",
        "solution": "6 \u00d7 (13 + 6 \u2013 7/3) = 100"
    },
    "seq22": {
        "sequence": "614573",
        "solution": "6 \u00d7 (14 + 5 \u2013 7/3) = 100"
    },
    "seq23": {
        "sequence": "615473",
        "solution": "6 \u00d7 (15 + 4 \u2013 7/3) = 100"
    },
    "seq24": {
        "sequence": "616373",
        "solution": "6 \u00d7 (16 + 3 \u2013 7/3) = 100"
    },
    "seq25": {
        "sequence": "617273",
        "solution": "6 \u00d7 (17 + 2 \u2013 7/3) = 100"
    },
    "seq26": {
        "sequence": "618173",
        "solution": "6 \u00d7 (18 + 1 \u2013 7/3) = 100"
    },
    "seq27": {
        "sequence": "249384",
        "solution": "2 \u00d7 (49 + 3 \u2013 8/4) = 100"
    },
    "seq28": {
        "sequence": "248484",
        "solution": "2 \u00d7 (48 + 4 \u2013 8/4) = 100"
    },
    "seq29": {
        "sequence": "247584",
        "solution": "2 \u00d7 (47 + 5 \u2013 8/4) = 100"
    },
    "seq30": {
        "sequence": "246684",
        "solution": "2 \u00d7 (46 + 6 \u2013 8/4) = 100"
    },
    "seq31": {
        "sequence": "245784",
        "solution": "2 \u00d7 (45 + 7 \u2013 8/4) = 100"
    },
    "seq32": {
        "sequence": "244884",
        "solution": "2 \u00d7 (44 + 8 \u2013 8/4) = 100"
    },
    "seq33": {
        "sequence": "243984",
        "solution": "2 \u00d7 (43 + 9 \u2013 8/4) = 100"
    },
    "seq34": {
        "sequence": "245682",
        "solution": "2 \u00d7 (45 + 8 \u2013 6/2) = 100"
    },
    "seq35": {
        "sequence": "333253",
        "solution": "3 \u00d7 (33 + 2 \u2013 5/3) = 100"
    },
    "seq36": {
        "sequence": "423484",
        "solution": "4 \u00d7 (23 + 4 \u2013 8/4) = 100"
    },
    "seq37": {
        "sequence": "424363",
        "solution": "4 \u00d7 (24 + 3 \u2013 6/3) = 100"
    },
    "seq38": {
        "sequence": "518484",
        "solution": "5 \u00d7 (18 + 4 \u2013 8/4) = 100"
    },
    "seq39": {
        "sequence": "517563",
        "solution": "5 \u00d7 (17 + 5 \u2013 6/3) = 100"
    },
    "seq40": {
        "sequence": "516642",
        "solution": "5 \u00d7 (16 + 6 \u2013 4/2) = 100"
    },
    "seq41": {
        "sequence": "712986",
        "solution": "((7 \u00d7 12) \u2013 9) \u00d7 (8/6) = 100"
    },
    "seq42": {
        "sequence": "812264",
        "solution": "8 \u00d7 (12 + 2 \u2013 6/4) = 100"
    },
    "seq43": {
        "sequence": "813164",
        "solution": "8 \u00d7 (13 + 1 \u2013 6/4) = 100"
    },
    "seq44": {
        "sequence": "912833",
        "solution": "((9 \u00d7 12) \u2013 8) \u00d7 (3/3) = 100"
    },
    "seq45": {
        "sequence": "516723",
        "solution": "5 \u00d7 (16 + 7 \u2013 6/2) = 100"
    },
    "seq46": {
        "sequence": "612773",
        "solution": "6 \u00d7 (12 + 7 \u2013 7/3) = 100"
    },
    "seq47": {
        "sequence": "613673",
        "solution": "6 \u00d7 (13 + 6 \u2013 7/3) = 100"
    },
    "seq48": {
        "sequence": "614573",
        "solution": "6 \u00d7 (14 + 5 \u2013 7/3) = 100"
    },
    "seq49": {
        "sequence": "615473",
        "solution": "6 \u00d7 (15 + 4 \u2013 7/3) = 100"
    },
    "seq50": {
        "sequence": "616373",
        "solution": "6 \u00d7 (16 + 3 \u2013 7/3) = 100"
    },
    "seq51": {
        "sequence": "617273",
        "solution": "6 \u00d7 (17 + 2 \u2013 7/3) = 100"
    },
    "seq52": {
        "sequence": "618173",
        "solution": "6 \u00d7 (18 + 1 \u2013 7/3) = 100"
    },
    "seq53": {
        "sequence": "249384",
        "solution": "2 \u00d7 (49 + 3 \u2013 8/4) = 100"
    },
    "seq54": {
        "sequence": "248484",
        "solution": "2 \u00d7 (48 + 4 \u2013 8/4) = 100"
    },
    "seq55": {
        "sequence": "247584",
        "solution": "2 \u00d7 (47 + 5 \u2013 8/4) = 100"
    },
    "seq56": {
        "sequence": "246684",
        "solution": "2 \u00d7 (46 + 6 \u2013 8/4) = 100"
    },
    "seq57": {
        "sequence": "245784",
        "solution": "2 \u00d7 (45 + 7 \u2013 8/4) = 100"
    },
    "seq58": {
        "sequence": "244884",
        "solution": "2 \u00d7 (44 + 8 \u2013 8/4) = 100"
    },
    "seq59": {
        "sequence": "243984",
        "solution": "2 \u00d7 (43 + 9 \u2013 8/4) = 100"
    },
    "seq60": {
        "sequence": "245682",
        "solution": "2 \u00d7 (45 + 8 \u2013 6/2) = 100"
    },
    "seq61": {
        "sequence": "333253",
        "solution": "3 \u00d7 (33 + 2 \u2013 5/3) = 100"
    },
    "seq62": {
        "sequence": "423484",
        "solution": "4 \u00d7 (23 + 4 \u2013 8/4) = 100"
    },
    "seq63": {
        "sequence": "424363",
        "solution": "4 \u00d7 (24 + 3 \u2013 6/3) = 100"
    },
    "seq64": {
        "sequence": "518484",
        "solution": "5 \u00d7 (18 + 4 \u2013 8/4) = 100"
    },
    "seq65": {
        "sequence": "517563",
        "solution": "5 \u00d7 (17 + 5 \u2013 6/3) = 100"
    },
    "seq66": {
        "sequence": "516642",
        "solution": "5 \u00d7 (16 + 6 \u2013 4/2) = 100"
    },
    "seq67": {
        "sequence": "712986",
        "solution": "((7 \u00d7 12) \u2013 9) \u00d7 (8/6) = 100"
    },
    "seq68": {
        "sequence": "812264",
        "solution": "8 \u00d7 (12 + 2 \u2013 6/4) = 100"
    },
    "seq69": {
        "sequence": "813164",
        "solution": "8 \u00d7 (13 + 1 \u2013 6/4) = 100"
    },
    "seq70": {
        "sequence": "912833",
        "solution": "((9 \u00d7 12) \u2013 8) \u00d7 (3/3) = 100"
    },
    "seq71": {
        "sequence": "516723",
        "solution": "5 \u00d7 (16 + 7 \u2013 6/2) = 100"
    },
    "seq72": {
        "sequence": "612773",
        "solution": "6 \u00d7 (12 + 7 \u2013 7/3) = 100"
    },
    "seq73": {
        "sequence": "613673",
        "solution": "6 \u00d7 (13 + 6 \u2013 7/3) = 100"
    },
    "seq74": {
        "sequence": "614573",
        "solution": "6 \u00d7 (14 + 5 \u2013 7/3) = 100"
    },
    "seq75": {
        "sequence": "615473",
        "solution": "6 \u00d7 (15 + 4 \u2013 7/3) = 100"
    },
    "seq76": {
        "sequence": "616373",
        "solution": "6 \u00d7 (16 + 3 \u2013 7/3) = 100"
    },
    "seq77": {
        "sequence": "617273",
        "solution": "6 \u00d7 (17 + 2 \u2013 7/3) = 100"
    },
    "seq78": {
        "sequence": "618173",
        "solution": "6 \u00d7 (18 + 1 \u2013 7/3) = 100"
    },
    "seq79": {
        "sequence": "249384",
        "solution": "2 \u00d7 (49 + 3 \u2013 8/4) = 100"
    },
    "seq80": {
        "sequence": "248484",
        "solution": "2 \u00d7 (48 + 4 \u2013 8/4) = 100"
    },
    "seq81": {
        "sequence": "247584",
        "solution": "2 \u00d7 (47 + 5 \u2013 8/4) = 100"
    },
    "seq82": {
        "sequence": "246684",
        "solution": "2 \u00d7 (46 + 6 \u2013 8/4) = 100"
    },
    "seq83": {
        "sequence": "245784",
        "solution": "2 \u00d7 (45 + 7 \u2013 8/4) = 100"
    },
    "seq84": {
        "sequence": "244884",
        "solution": "2 \u00d7 (44 + 8 \u2013 8/4) = 100"
    },
    "seq85": {
        "sequence": "243984",
        "solution": "2 \u00d7 (43 + 9 \u2013 8/4) = 100"
    },
    "seq86": {
        "sequence": "245682",
        "solution": "2 \u00d7 (45 + 8 \u2013 6/2) = 100"
    },
    "seq87": {
        "sequence": "333253",
        "solution": "3 \u00d7 (33 + 2 \u2013 5/3) = 100"
    },
    "seq88": {
        "sequence": "423484",
        "solution": "4 \u00d7 (23 + 4 \u2013 8/4) = 100"
    },
    "seq89": {
        "sequence": "424363",
        "solution": "4 \u00d7 (24 + 3 \u2013 6/3) = 100"
    },
    "seq90": {
        "sequence": "518484",
        "solution": "5 \u00d7 (18 + 4 \u2013 8/4) = 100"
    },
    "seq91": {
        "sequence": "517563",
        "solution": "5 \u00d7 (17 + 5 \u2013 6/3) = 100"
    },
    "seq92": {
        "sequence": "516642",
        "solution": "5 \u00d7 (16 + 6 \u2013 4/2) = 100"
    },
    "seq93": {
        "sequence": "712986",
        "solution": "((7 \u00d7 12) \u2013 9) \u00d7 (8/6) = 100"
    },
    "seq94": {
        "sequence": "812264",
        "solution": "8 \u00d7 (12 + 2 \u2013 6/4) = 100"
    },
    "seq95": {
        "sequence": "813164",
        "solution": "8 \u00d7 (13 + 1 \u2013 6/4) = 100"
    },
    "seq96": {
        "sequence": "912833",
        "solution": "((9 \u00d7 12) \u2013 8) \u00d7 (3/3) = 100"
    },
    "seq97": {
        "sequence": "516723",
        "solution": "5 \u00d7 (16 + 7 \u2013 6/2) = 100"
    },
    "seq98": {
        "sequence": "612773",
        "solution": "6 \u00d7 (12 + 7 \u2013 7/3) = 100"
    },
    "seq99": {
        "sequence": "613673",
        "solution": "6 \u00d7 (13 + 6 \u2013 7/3) = 100"
    },
    "seq100": {
        "sequence": "614573",
        "solution": "6 \u00d7 (14 + 5 \u2013 7/3) = 100"
    },
    "seq101": {
        "sequence": "615473",
        "solution": "6 \u00d7 (15 + 4 \u2013 7/3) = 100"
    },
    "seq102": {
        "sequence": "616373",
        "solution": "6 \u00d7 (16 + 3 \u2013 7/3) = 100"
    },
    "seq103": {
        "sequence": "617273",
        "solution": "6 \u00d7 (17 + 2 \u2013 7/3) = 100"
    },
    "seq104": {
        "sequence": "618173",
        "solution": "6 \u00d7 (18 + 1 \u2013 7/3) = 100"
    }
}
  

const GameContainer = ({ onNewGame }) => {
    const [digits, setDigits] = useState([])
    const [timerActive, setTimerActive] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState({ show: false, correct: false, message: '' })
    const [solution, setSolution] = useState('')
    const [showSolution, setShowSolution] = useState(false)
    const timerRef = useRef(null)
  
    useEffect(() => {
      startNewGame()
    }, [])
  
    const startNewGame = () => {
      const keys = Object.keys(problems)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const chosenProblem = problems[randomKey]
    
      const digitArray = chosenProblem.sequence.split('').map(Number)
    
      setDigits(digitArray)
      setSolution(chosenProblem.solution)
      setExpression('')
      setResult({ show: false, correct: false, message: '' })
      setShowSolution(false)
    
      setStartTime(Date.now())
      setElapsedTime(0)
      setTimerActive(true)
    
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    
    useEffect(() => {
      if (timerActive) {
        timerRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTime)
        }, 1000)
      } else if (timerRef.current) {
        clearInterval(timerRef.current)
      }
  
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }, [timerActive, startTime])
  
    const checkSolution = () => {
      if (!expression.trim()) {
        setResult({
          show: true,
          correct: false,
          message: "Please enter a solution."
        })
        return
      }
  
      if (!verifyDigitsOrder(expression, digits)) {
        setResult({
          show: true,
          correct: false,
          message: "You must use all digits in the correct order."
        })
        return
      }
  
      try {
        const jsExpression = expression.replace(/\^/g, '**')
        const value = eval(jsExpression)
  
        if (value === 100) {
          setResult({
            show: true,
            correct: true,
            message: "Correct! Your solution equals 100!"
          })
          setTimerActive(false)
        } else {
          setResult({
            show: true,
            correct: false,
            message: `Your solution equals ${value}, not 100.`
          })
        }
      } catch (error) {
        setResult({
          show: true,
          correct: false,
          message: "Invalid expression. Please check your syntax."
        })
      }
    }
  
    const handleGiveUp = () => {
      setTimerActive(false)
      setShowSolution(true)
      setResult({
        show: true,
        correct: false,
        message: "Here's a solution to this Hectoc puzzle."
      })
    }
  
    // Modern game UI styles
    const styles = {
      container: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '25px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #1c2340, #293462)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(66, 99, 235, 0.1)',
        fontFamily: "'Poppins', sans-serif",
        textAlign: 'center',
        color: '#e0e6ff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(66, 99, 235, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      },
      header: {
        marginBottom: '25px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      backgroundElement: {
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(66, 99, 235, 0.15) 0%, rgba(66, 99, 235, 0) 70%)',
        zIndex: -1
      },
      solutionDisplay: {
        marginTop: '25px',
        padding: '20px',
        backgroundColor: 'rgba(66, 99, 235, 0.1)',
        border: '1px solid rgba(66, 99, 235, 0.3)',
        borderRadius: '12px',
        animation: 'fadeIn 0.5s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      },
      title: {
        fontSize: window.innerWidth < 480 ? '1.4rem' : '1.7rem',
        marginBottom: '0',
        color: '#00dffc',
        fontWeight: '600',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        flex: '1',
        textAlign: 'left'
      },
      solutionText: {
        fontSize: window.innerWidth < 480 ? '1.1rem' : '1.3rem',
        color: '#fff',
        fontFamily: 'monospace',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
      },
      solutionHeader: {
        color: '#00dffc',
        margin: '0 0 15px 0',
        fontSize: '1.3rem',
        fontWeight: '600',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      },
      targetNumber: {
        display: 'inline-block',
        backgroundColor: 'rgba(66, 99, 235, 0.15)',
        borderRadius: '8px',
        padding: '4px 12px',
        color: '#00dffc',
        fontWeight: 'bold',
        marginLeft: '8px',
        fontSize: '1.1rem',
        border: '1px solid rgba(66, 99, 235, 0.3)'
      },
      sparkle: {
        position: 'absolute',
        width: '3px',
        height: '3px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
        opacity: 0.7,
        zIndex: -1
      }
    }
    
    // Create 20 random sparkles for background effect
    const sparkles = Array.from({ length: 20 }, (_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 5}s`
    }))
    
    return (
      <div style={styles.container}>
        {/* Background design elements */}
        <div style={{...styles.backgroundElement, top: '-50px', left: '-50px'}}></div>
        <div style={{...styles.backgroundElement, bottom: '-30px', right: '-30px'}}></div>
        <div style={{...styles.backgroundElement, top: '30%', right: '-70px'}}></div>
        <div style={{...styles.backgroundElement, bottom: '20%', left: '-20px'}}></div>
        
        {/* Sparkle animations */}
        {sparkles.map((sparkle, index) => (
          <div 
            key={index} 
            style={{
              ...styles.sparkle,
              top: sparkle.top,
              left: sparkle.left,
              animation: `twinkle ${sparkle.animationDuration} infinite ${sparkle.animationDelay}`
            }}
          />
        ))}
        
        <div style={styles.header}>
          <h2 style={styles.title}>
            Find <span style={styles.targetNumber}>100</span>
          </h2>
          <Timer elapsedTime={elapsedTime} />
        </div>
  
        <DigitDisplay digits={digits} />
  
        <ExpressionInput
          expression={expression}
          setExpression={setExpression}
          checkSolution={checkSolution}
        />
  
        {result.show && (
          <ResultDisplay correct={result.correct} message={result.message} />
        )}
  
        {showSolution && (
          <div style={styles.solutionDisplay}>
            <h3 style={styles.solutionHeader}>Solution</h3>
            <p style={styles.solutionText}>{solution}</p>
          </div>
        )}
  
        <ButtonGroup
          onNewGame={startNewGame}
          onGiveUp={handleGiveUp}
          showSolution={showSolution}
        />
        
        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.5); }
            100% { opacity: 0.2; transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }
  
  const verifyDigitsOrder = (expression, digits) => {
    const expressionDigits = expression.replace(/[^0-9]/g, '')
    const expectedDigits = digits.join('')
    return expressionDigits === expectedDigits
  }
  
  export default GameContainer