import type { FormatNumberOptions } from "./format-number.type";

import { FormatNumberUnits } from "./format-number.enum";

import { isNull, isUndefined } from "../../is.util";

export default function formatNumber(num?: number | null, options?: FormatNumberOptions): string {
  if(isUndefined(num) || isNull(num)) {
		return "";
	}

  if(options?.nullsCount) {
		return processNulls(num, options.nullsCount);
	}

  if(!isUndefined(options?.unit)) {
    return processUnit(num, options.unit);
	}

  return num.toFixed(2);
};

function processNulls(num: number, nullsCount: number): string {
  let processedNum: string[] = Array.from(num.toString());
	let index: number = processedNum.length;
  		
	const length: number = nullsCount;

  if(processedNum.length >= length) {
    return processedNum.join("");
  }
  
  while(index < length) {
    processedNum.unshift("0");
    index++;
  }

  return processedNum.join("");
};

function processUnit(num: number, unit: FormatNumberUnits): string {
  switch(unit) {
    case FormatNumberUnits.DATA_UNIT:
      const DATA_UNIT_KEYS: string[] = ["B", "KB", "MB", "GB"];

      let unitKeyIndex: number = 0
      let processedNum: number = num;
            
      while(processedNum >= 1024) {
        processedNum /= 1024;

        if(unitKeyIndex + 1 <= DATA_UNIT_KEYS.length - 1) {
          unitKeyIndex++;
        }
      }

      return `${processedNum.toFixed(2)}${DATA_UNIT_KEYS[unitKeyIndex]}`;
  }
};