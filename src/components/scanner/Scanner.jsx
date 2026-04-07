import { motion } from 'framer-motion';
import './Scanner.css';

const Scanner = () => (
  <motion.div 
    initial={{ top: "-5%" }}
    animate={{ top: "105%" }}
    transition={{ duration: 2, ease: "linear", delay: 1.2 }}
    className="scanner-line"
  />
);

export default Scanner;