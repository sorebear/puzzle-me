import React from 'react';

function winModal(props) {
  if (props.showModal === "noModal") {
    return <div></div>
  }
  return (
    <div className={props.showModal}>
      <div onClick={props.closeModal} />
      <div className="card p-5">
        <div className="card-body text-center">
          <h4 className="card-title red-text">Congratulations!</h4>
          <p className="card-text">
              You won in {props.score} moves!
          </p>
          <p className="card-text">
            {props.error ? props.error : 'Your score has been submitted'}
          </p>
          <p className={`card-text ${!props.error && props.points ? "" : "d-none"}`}>
            {`You received ${props.points} XP`}
          </p>
          <button type="button" onClick={props.closeModal} className="m-2 btn">Close</button>
        </div>
      </div>
    </div>
  );
}
export default winModal;
