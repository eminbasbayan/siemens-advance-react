import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

function Button(props) {
  console.log("Button çalıştı!");

  return <button onClick={props.onClick}>{props.children}</button>;
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const Memoized = React.memo(Button);

export default Memoized;
