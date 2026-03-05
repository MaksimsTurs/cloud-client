import { test, expect } from "vitest";

import { 
  countDuplicatesOfPrimitives, 
  deleteDuplicatesOfPrimitives, 
  firstLetterToUpperCase, 
  formatNumber,
  inObject
} from "../std/std.util";
import { FormatNumberUnits } from "../std/number/format-number.enum";
import fromObjectToFormData from "../std/object/from-object-to-form-data.util";

test("Count duplicates of primitives from array.", function() {
  const res = countDuplicatesOfPrimitives([1, 2, 3, 4, 5, 5, 6], new Set([1, 2, 3, 4, 5, 6]));

  expect(res).toStrictEqual({ "1": 1, "2": 1, "3": 1, "4": 1, "5": 2, "6": 1 });
});

test("Delete duplicates of primitives from array.", function() {
  const res = deleteDuplicatesOfPrimitives([1, 2, 3, 4, 5, 5, 6], new Set([1, 2, 3, 4, 5, 6]));

  expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

test("Format number, add one nulls", function() {
  const res = formatNumber(10, { nullsCount: 3 });

  expect(res).eq("010");
});

test("Format number, format to KB.", function() {
  const res = formatNumber(10_000, { unit: FormatNumberUnits.DATA_UNIT });

  expect(res).eq("9.77KB");
});

test("Format number, format to MB.", function() {
  const res = formatNumber(100_000_000, { unit: FormatNumberUnits.DATA_UNIT });

  expect(res).eq("95.37MB");
});

test("Format number, format to GB.", function() {
  const res = formatNumber(100_000_000_000, { unit: FormatNumberUnits.DATA_UNIT });

  expect(res).eq("93.13GB");
});

test("Convert object to FormData.", function() {
  const res: FormData = fromObjectToFormData({
    name:           "Musterman",
    age:            20,
    nullProp:       null,
    undefinedProp: undefined
  })

  expect(res.get("name")).eq("Musterman");
  expect(res.get("age")).eq("20");
  expect(res.get("nullProp")).eq("null");
  expect(res.get("undefinedProp")).eq("undefined");
});

test("Check if object contain a property.", function() {
  const res: boolean = inObject(["name", "age"], { name: "", age: "" });

  expect(res).eq(true);
});

test("Check if object doesn't contain a property.", function() {
  const res: boolean = inObject(["name", "age"], {});

  expect(res).eq(false);
});

test("Convert first letter to upper case, array of strings.", function() {
  const res: string[] = firstLetterToUpperCase(["name", "age"]) as string[];
  
  expect(res).toStrictEqual(["Name", "Age"]);
});

test("Convert first letter to upper case, single string.", function() {
  const res: string = firstLetterToUpperCase("Name") as string;
  
  expect(res).eq("Name");
});