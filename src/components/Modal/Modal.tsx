import React from "react";
import classes from "./Modal.module.scss";
import Text from "../Text";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import * as motion from 'motion/react-client'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, message }) => {
  return (
    <AnimatePresence>
      {!isOpen ? null : 
      <motion.div className={classes.modalOverlay} onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0}}
      >
        <div
          className={classNames(classes.modal, {
            [classes.modal_success]: type === "success",
            [classes.modal_error]: type === "error",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <Text view="p-18" weight="medium">
            {message}
          </Text>
        </div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default Modal;
