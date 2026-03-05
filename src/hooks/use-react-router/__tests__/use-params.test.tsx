import type { PropsWithChildren } from "react";

import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { ReactRouterContext } from "../components/Routes.component";

import useParams from "../use-params.hook";

test("Test the useParams hook, with paths that have valid params.", function() {
  const { result } = renderHook(() => useParams(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: ["/", "/user/3fb433fk/article/4ff3n40f"],
          patterns: new Set<string>(["/", "/user/:userId/article/:articleId"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: string): void {},
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current)
    .toStrictEqual({
      userId:    "3fb433fk",
      articleId: "4ff3n40f"
    });
});

test("Test the useParams hook, with paths that have no params.", function() {
  const { result } = renderHook(() => useParams(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: ["/", "/home"],
          patterns: new Set<string>(["/", "/home"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: string): void {},
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current)
    .toStrictEqual({});
});

test("Test the useParams hook, wit invalid params.", function() {
  const { result } = renderHook(() => useParams(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: ["/", "/49295/home"],
          patterns: new Set<string>(["/", "/home/:id"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: string): void {},
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current)
    .toStrictEqual({});
});

test("Test the useParams hook that was called outside the contexts.", function() {
  expect(() => renderHook(() => useParams()))
    .toThrow("[useParams]: You should wrapp you App into Routes component!");
});