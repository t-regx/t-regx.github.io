import React from "react";

const nonBreakingHyphen = String.fromCharCode(8209);

export const TRegx = () => <>T&#8209;Regx</>;
export const tRegx = `T${nonBreakingHyphen}Regx`;
