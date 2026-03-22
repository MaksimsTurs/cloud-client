import type { PropsWithChildren } from "react";

import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { ReactRouterContext } from "../components/Routes.component";

import usePath from "../use-path.hook";

test("Test the usePath hook with valid paths.", function() {
  const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: ["/"],
          searchParams: new URLSearchParams(),
          patterns: new Set<string>(["/", "/user/:userId/article/:articleId"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: any): void {},
          setSearchParams: function(_: any): void {}
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current).toBe("/");
});

test("Test the usePath hook without valid paths.", function() {
  const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: [],
          searchParams: new URLSearchParams(),
          patterns: new Set<string>(["/", "/home"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: any): void {},
          setSearchParams: function(_: any): void {}
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current).toBe(undefined);
});

test("Test the usePath hook that was called outside the contexts.", function() {
  expect(() => renderHook(() => usePath()))
    .toThrow("[usePath]: You should wrapp you App into Routes component!");
});
