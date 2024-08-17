import { vi } from "vitest";

const d3Mock = {
  select: vi.fn(() => d3Mock),
  selectAll: vi.fn(() => d3Mock),
  attr: vi.fn(() => d3Mock),
  style: vi.fn(() => d3Mock),
  append: vi.fn(() => d3Mock),
  text: vi.fn(() => d3Mock),
  enter: vi.fn(() => d3Mock),
  exit: vi.fn(() => d3Mock),
  remove: vi.fn(() => d3Mock),
  data: vi.fn(() => d3Mock),
  call: vi.fn(() => d3Mock),
};

export default d3Mock;
