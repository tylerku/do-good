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
      width="44"
      height="44"
    >
      <motion.path
        d="M7.2 13.6 C 7.2 10.065 10.065 7.2 13.6 7.2 L 30.4 7.2 C 33.934 7.2 36.8 10.065 36.8 13.6 L 36.8 30.4 C 36.8 33.934 33.934 36.8 30.4 36.8 L 13.6 36.8 C 10.065 36.8 7.2 33.934 7.2 30.4 Z"
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
        d="M10 16.433 L 16.432 23.237 L 27.130 10"
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