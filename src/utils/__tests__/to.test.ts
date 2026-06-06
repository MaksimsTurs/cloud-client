import { test, expect } from "vitest";

import { fromObjectToFormData } from "../to.util";

test("Create form data from js object.", function() {
  const obj = {
    name: "Max",
    age: 20,
    hobbies: ["Js", "Ts"],
  }

  const formData: FormData = fromObjectToFormData(obj);

  expect(formData.get("name"))
    .toBe("Max");
  expect(formData.get("age"))
    .toBe("20");
  expect(formData.get("hobbies"))
    .toBe("[\"Js\",\"Ts\"]");
});
