import React from 'react';

const Notification = (props) => {

    return (

        props.show && <div className="loader" >
            <div className="loader-spinner"></div>
            <div className="message">
                {props.message}
            </div>
        </div >


    )

}
export default Notification;