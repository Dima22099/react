import './Button.css';
import { useState } from 'react';

const Button = ({ children, onClick }) => (
  <button className="button accent" onClick={onClick}>{children}</button>
);

export default Button;
