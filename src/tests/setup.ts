import "@testing-library/jest-dom";
import d3Mock from "./d3Mock.ts";

vi.mock("d3", () => d3Mock);
