import styles from './Button.module.css'
import PropTypes from 'prop-types'
export default function Button({children,onClick,type}) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
  )
}

Button.propTypes={
   onClick: PropTypes.func,
   type:PropTypes.string,
   children:PropTypes.string 
}
