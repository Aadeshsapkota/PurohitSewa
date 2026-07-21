import React from 'react'
import './SuccessPannel.css'

function SuccessPannel() {
    return (
        <div>
            <div className="success-panel">
                <div className="success-icon">&#10003;</div>
                <h2 className="success-title">You are booked</h2>
                <p className="success-detail">
                    We've received your request and will be in touch shortly.
                </p>
            </div>
        </div>
    )
}

export default SuccessPannel