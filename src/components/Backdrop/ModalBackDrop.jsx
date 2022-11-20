import { motion } from "framer-motion";
import "./Backdrop.css";

const ModalBackDrop = ({ children, onClick }) => {
  return (
    <motion.div 
    className="modal-back-drop" 
    onClick={onClick}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {children}
    </motion.div>
  );
};

export default ModalBackDrop;
