import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
  return (
    // Adding classes to the button, including conditional styles[type]
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
