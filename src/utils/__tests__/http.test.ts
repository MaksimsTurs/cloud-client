import { expect, test, describe } from "vitest";

import formatBody from "../http/utils/format-body.util";
import formatHeaders from "../http/utils/format-headers.util";
import getResponseBodyData from "../http/utils/get-response-body-data.util";

test("Try format any data to request body.", function() {
  expect(formatBody({ name: "Max", age: 20 }))
    .toBe("{\"name\":\"Max\",\"age\":20}");
  expect(formatBody([1, 2, 3, 4, 5]))
    .toBe("[1,2,3,4,5]");
  expect(formatBody(20))
    .toBe(20);
  expect(formatBody(undefined))
    .toBe(undefined);
  expect(formatBody(new Map()))
    .toBeInstanceOf(Map);
});

describe("Try format headers without user headers.", function() {
  test("headers for js object", function() {
    const headers: Headers = formatHeaders(undefined, { name: "Max", age: 20 }); 

    expect(headers.get("Content-Type"))
      .toBe("application/json");
  });

  test("headers for js array", function() {
    const headers: Headers = formatHeaders(undefined, [1, 2, 3, 4, 5, 6]); 

    expect(headers.get("Content-Type"))
      .toBe("application/json"); 
  });

  test("headers for buffer array", function() {
    const headers: Headers = formatHeaders(undefined, new ArrayBuffer()); 

    expect(headers.get("Content-Type"))
      .toBe("application/octet-stream"); 
  });

  test("headers for uint8 array", function() {
    const headers: Headers = formatHeaders(undefined, new Uint8Array()); 

    expect(headers.get("Content-Type"))
      .toBe("application/octet-stream"); 
  });
});

describe("Try format headers with user headers.", function() {
  test("headers for js object", function() {
    const headers: Headers = formatHeaders({ Authentication: "Bearer xxxxxx" }, { name: "Max", age: 20 }); 

    expect(headers.get("Content-Type"))
      .toBe("application/json");
  });

  test("headers for js array", function() {
    const headers: Headers = formatHeaders({ Authentication: "Bearer xxxxxx" }, [1, 2, 3, 4, 5, 6]); 

    expect(headers.get("Content-Type"))
      .toBe("application/json"); 
  });

  test("headers for buffer array", function() {
    const headers: Headers = formatHeaders({ Authentication: "Bearer xxxxxx" }, new ArrayBuffer()); 

    expect(headers.get("Content-Type"))
      .toBe("application/octet-stream"); 
  });

  test("headers for uint8 array", function() {
    const headers: Headers = formatHeaders({ Authentication: "Bearer xxxxxx" }, new Uint8Array()); 

    expect(headers.get("Content-Type"))
      .toBe("application/octet-stream"); 
  });
});

describe("Try get data from respone.", function() {
  test("get js object", async function() {
    const response = new Response("{\"name\":\"Maksims\",\"age\":20}", {
      headers: { "Content-Type": "application/json" }
    });
    const body = await getResponseBodyData(response);

    expect(body)
      .toStrictEqual({ name: "Maksims", age: 20 });
  });

  test("get js object as text", async function() {
    const response = new Response("{\"name\":\"Maksims\",\"age\":20}", {
      headers: { "Content-Type": "application/json" }
    });
    const body = await getResponseBodyData(response, { processAs: "text" });

    expect(body)
      .toStrictEqual("{\"name\":\"Maksims\",\"age\":20}");
  });

  test("get array buffer", async function() {
    const response = new Response("value", {
      headers: { "Content-Type": "application/octet-stream" }
    });
    const body = await getResponseBodyData(response, { processAs: "arrayBuffer" });

    expect(body)
      .instanceOf(ArrayBuffer);
  })
});

describe("Try get data from response with specifying incorrect processAs option.", async function() {
  test("not specifying the processAs value", async function() {
    const response = new Response("buffer", {
      headers: { "Content-Type": "audio/mp3" }
    });

    expect(async() => await getResponseBodyData(response))
      .rejects
      .toThrowError("mime-type(audio/mp3) and processAs(undefined) option does not match!");
  });

  test("specifying incorrect processAs value", async function() {
    const response = new Response(undefined, {
      headers: {
        "Content-Type": "audio/mp3"
      }
    });

    expect(async () => await getResponseBodyData(response, { processAs: "json" }))
      .rejects
      .toThrowError("mime-type(audio/mp3) and processAs(json) option does not match!");
  });
});
