"use client";

import React from 'react'

type TextProps = {
  questionText: string
  linkText: string
}

const SwitchLogin: React.FC<TextProps> = ({ questionText, linkText }) => {
  return (
    <h3 className="text-[#707375] font-medium">
      {questionText}{" "}
      <span className="text-[#A31ABE] font-medium">
        {linkText}
      </span>
    </h3>
  )
}

export default SwitchLogin
