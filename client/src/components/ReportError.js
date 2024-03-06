// ReportError.js
import React, { useState } from "react";
import "../styles/ReportError.css";

const ReportError = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [reportText, setReportText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reportText.trim() === "") {
            setErrorMessage("Please enter a valid error message.");
            return;
        }

        console.log("Error reported:", reportText);
        setErrorMessage("");
        setReportText("");
    };

    return (
        <div className="report-error-container">
            <h2>Report Error</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="report-error-textarea"
                    placeholder="Describe the error..."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                ></textarea>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <button type="submit" className="report-error-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReportError;
