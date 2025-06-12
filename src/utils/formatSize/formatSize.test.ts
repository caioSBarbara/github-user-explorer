import { formatSize } from "./formatSize";

describe("formatSize", () => {
  it("should format size in KB for small values", () => {
    expect(formatSize(0)).toBe("0 KB");
    expect(formatSize(100)).toBe("100 KB");
    expect(formatSize(512)).toBe("512 KB");
    expect(formatSize(1023)).toBe("1023 KB");
  });

  it("should format size in MB for larger values", () => {
    expect(formatSize(1024)).toBe("1.0 MB");
    expect(formatSize(1536)).toBe("1.5 MB");
    expect(formatSize(2048)).toBe("2.0 MB");
    expect(formatSize(5120)).toBe("5.0 MB");
  });

  it("should format large sizes correctly", () => {
    expect(formatSize(10240)).toBe("10.0 MB");
    expect(formatSize(15360)).toBe("15.0 MB");
    expect(formatSize(51200)).toBe("50.0 MB");
  });

  it("should handle decimal values correctly", () => {
    expect(formatSize(1050)).toBe("1.0 MB");
    expect(formatSize(1126)).toBe("1.1 MB");
    expect(formatSize(1536)).toBe("1.5 MB");
  });

  it("should handle edge cases", () => {
    expect(formatSize(1)).toBe("1 KB");
    expect(formatSize(1024)).toBe("1.0 MB");
  });
});
