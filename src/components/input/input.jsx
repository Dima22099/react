import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './input.module.css';

const Input = forwardRef(({
  className, appearance, formValidState = true, ...props
}, ref) => (
  <input
    {...props}
    ref={ref}
    className={cn(className, {
      [styles.invalid]: !formValidState,
      [styles['input-title']]: appearance === 'title'
    })}
  />
));

export default Input;
