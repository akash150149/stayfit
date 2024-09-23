import React, { useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";


const styles = makeStyles({
    bmi: {
        width: "100%",
        float: "left",
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bmibackground.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: "861px",
    },
    title: {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "30px",
        color: "#666666",
    },
    label: {
        textAlign: "left",
        display: "block",
        marginLeft: "15.3%",
    },
    input: {
        width: "60%",
        textAlign: "center",
        padding: "3px 10px",
        margin: "10px 0",
        border: "3px solid #ddd",
        boxSizing: "border-box",
    },
    button: {
        fontWeight: "bold",
        width: "150px",
        marginTop: "20px",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        height: "35px",
        padding: "0 20px",
        borderRadius: "8px",
        background: "#9CB3D3",
        color: "#fff",
        cursor: "pointer",
        transition: "background .3s",
        "&:hover": {
            backgroundColor: "#3070F2"
        },
    },
    image: {
        width: "36%",
        height: "40%",
        float: "right",
        marginRight: "150px",
        marginTop: "80px",
        display: 'block',
        boxShadow: "20px 70px 8px 15px #404040",
    },
    dropdown: {
        display: "block",
        marginLeft: "20%",
        width: "60%",
        marginTop: "10px",
        padding: "5px",
        border: "3px solid #ddd",
        boxSizing: "border-box",
        fontFamily: "Nunito",
    },
    resultone: {
        fontSize: "30px",
        color: "#666666",
    },
    resulttwo: {
        fontSize: "20px",
        color: "#666666",
    },
    feedback: {
        width: "90%",
        fontSize: "20px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        color: "#000000",
        marginBottom: "10px",
    },
    form: {
        textAlign: "center",
        marginTop: "80px",
        backgroundColor: "#fff",
        marginLeft: "10%",
        marginRight: "60%",
        boxShadow: "10px 5px 10px 10px #404040",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
    },

});

const BMICalculator = () => {
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmiValue, setBMIValue] = useState(null);
    const [level, setLevel] = useState("");
    const [feedback, setFeedback] = useState("");
    const [system, setSystem] = useState("metric");

    function calculateBMI() {
        let bmi;
        if (system === "metric") {
            bmi = (weight / (height * height)).toFixed(2);
        } else {
            bmi = ((703 * weight) / (height * height)).toFixed(2);
        }
        setBMIValue(bmi);

        let bmiResult = getLevel(bmi);
        setLevel(bmiResult);

        let tempFeed = getFeedback(bmi);
        setFeedback(tempFeed);

        setWeight("");
        setHeight("");
    }

    function getLevel(val) {
        if (val < 18.5) {
            return "You are underweight!";
        } else if (val >= 18.5 && val <= 24.9) {
            return "You are normal!";
        } else if (val >= 25 && val <= 29.9) {
            return "You are overweight!";
        } else if (val >= 30 && val <= 34.9) {
            return "You are obese!";
        } else if (val >= 35) {
            return "You are extremely obese!";
        } else {
            return "Error calculating BMI.";
        }
    }

    function getFeedback(val) {
        if (val < 18.5) {
            return "Increase your calorie intake and incorporate exercise.";
        } else if (val >= 18.5 && val <= 24.9) {
            return "Maintain your current weight with balanced diet and exercise.";
        } else if (val >= 25 && val <= 29.9) {
            return "Consider reducing calorie intake and increasing exercise.";
        } else if (val >= 30 && val <= 34.9) {
            return "Adopt a caloric deficit and prioritize cardio.";
        } else if (val >= 35) {
            return "Consult a healthcare provider and aim for a significant calorie deficit.";
        } else {
            return "No feedback.";
        }
    }

    const classes = styles();
    return (
        <ThemeProvider>
            <div className={classes.bmi}>
                <div className={classes.image} data-aos="fade-right">
                    <img src={`${process.env.PUBLIC_URL}/assets/bmiimage.jpg`} alt="bmi" />
                </div>
                <div className={classes.form} data-aos="fade-left">
                    <form>
                        <h1 className={classes.title}>BMI Calculator</h1>
                        <div>
                            <label className={classes.label}>Enter Weight:</label>
                            <input className={classes.input}
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={classes.label}>Enter Height:</label>
                            <input className={classes.input}
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <select
                            className={classes.dropdown}
                            value={system}
                            onChange={(e) => setSystem(e.target.value)}>
                            <option value="metric">Metric (Kilograms/Metres)</option>
                            <option value="imperial">Imperial (Pounds/Inches)</option>
                        </select>
                        <button
                            type="button"
                            className={classes.button}
                            onClick={calculateBMI}>Calculate BMI
                        </button>
                        {bmiValue && (
                            <div>
                                <h1 className={classes.resultone}>Your BMI is: {bmiValue}</h1>
                                <h2 className={classes.resulttwo}>{level}</h2>
                            </div>
                        )}
                        <div className={classes.feedback}>
                            <p>{feedback}</p>
                        </div>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default BMICalculator;
