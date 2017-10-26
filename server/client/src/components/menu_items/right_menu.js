import React from 'react';

export default (props) => {
    const styles = {
        sideMenuStyle : {
            position: "fixed",
            top: 0,
            right: 0,
            width: props.width,
            height: props.height,
        }
    }
    return (
        <div style={styles.sideMenuStyle}/>
    )
}


