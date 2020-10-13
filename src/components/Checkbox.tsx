import * as React from "react";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 }
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 6.0 },
  pressed: { scale: 0.95, strokeWidth: 3.5 },
  checked: { stroke: "#BBFFB8" },
  unchecked: { stroke: "#ddd", strokeWidth: 5.0 }
};

interface CheckboxProps {
  checked: boolean
}

export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
      initial={false}
      animate={props.checked ? "checked" : "unchecked"}
      transition={{duration: 0.4}}
      whileTap="pressed"
      width="33"
      height="33"
    >
      <motion.path
        d="M5.4 10.2 C 5.4 7.549 7.549 5.4 10.2 5.4 L 22.8 5.4 C 25.45 5.4 27.6 7.548 27.6 10.2 L 27.6 22.8 C 27.6 25.4505 25.4505 27.6 22.8 27.6 L 10.2 27.6 C 7.548 27.6 5.4 25.4505 5.4 22.8 Z"
        fill="transparent"
        strokeWidth="5"
        stroke="#BBFFB8"
        variants={boxVariants}
      />
      {/* <motion.path
        d="M0 12.866 L 12.865 25.737 L 34.180 0"
        transform="translate(5.491 8.8332) rotate(-0.4 17.090 12.868)"
        fill="transparent"
        strokeWidth="6.5"
        stroke="hsl(0, 0%, 100%)"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        custom={props.checked}
      /> */}
      <motion.path
        d="M7.25 10.075 L 12.075 15.777 L 20.098 5.25"
        transform="translate(2.451 4.4112) rotate(-0.2 8.890 6.434)"
        fill="transparent"
        strokeWidth="6.5"
        stroke="#A39DFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        style={{ pathLength, opacity }}
        custom={props.checked}
      />
    </motion.svg>
  );
};