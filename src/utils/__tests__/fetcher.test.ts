import { expect, test } from "vitest";

import formatUrl from "../fetcher/utils/format-url.util";
import formatInit from "../fetcher/utils/format-init.util";

test("Format url with undefined base url.", function() {
  expect(formatUrl(undefined, "http://localhost:400/v1/api")).eq("http://localhost:400/v1/api");
});

test("Format url with base url.", function() {
  expect(formatUrl("http://localhost:400/v1", "/api")).eq("http://localhost:400/v1/api");
});

test("Format fetcher options, body and headers are undefined.", function() {
  expect(formatInit(undefined, undefined))
    .toStrictEqual({ 
      headers: { "Content-Type": "application/json" }, 
      body:    "{}"
    });
});

test("Format fetcher options, body (object) and headers are defined.", function() {
  expect(formatInit({ name: "Musterman", age: 20 }, { Authentification: "Bearer token" }))
    .toStrictEqual({ 
      headers: { "Content-Type": "application/json", Authentification: "Bearer token" }, 
      body:    "{\"name\":\"Musterman\",\"age\":20}"
    });
});

test("Format fetcher options, body (form data) and headers are defined.", function() {
  const formData: FormData = new FormData();

  formData.append("name", "Musterman");
  formData.append("age", "20");
  
  expect(formatInit(formData, { Authentification: "Bearer token" }))
    .toStrictEqual({ headers: { Authentification: "Bearer token" }, body: formData });
});
