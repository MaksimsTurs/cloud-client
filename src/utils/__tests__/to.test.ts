import { test, expect } from "vitest";

import { toFormDataFromObject } from "../to.util";

test("Create form data from js object.", function() {
  const obj = {
    name: "Max",
    age: 20,
    hobbies: ["Js", "Ts"],
  }

  const formData: FormData = toFormDataFromObject(obj);

  expect(formData.get("name"))
    .toBe("Max");
  expect(formData.get("age"))
    .toBe("20");
  expect(formData.get("hobbies"))
    .toBe("[\"Js\",\"Ts\"]");
});
