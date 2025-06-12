import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format date correctly in pt-BR format", () => {
    const testDate = "2024-01-15T10:30:00Z";
    const result = formatDate(testDate);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toMatch(/\d{1,2} de \w+ de \d{4}/);
  });

  it("should format date correctly considering timezone", () => {
    const testDate = "2023-12-25T12:00:00Z";
    const result = formatDate(testDate);

    expect(result).toBeDefined();
    expect(result).toMatch(/25 de dezembro de 2023/);
  });

  it("should handle valid ISO date string", () => {
    const testDate = "2024-06-10T15:30:45.123Z";
    const result = formatDate(testDate);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toMatch(/10 de junho de 2024/);
  });

  it("should handle different date formats", () => {
    const testDate1 = "2024-03-01";
    const testDate2 = "2024-03-01T00:00:00.000Z";

    const result1 = formatDate(testDate1);
    const result2 = formatDate(testDate2);

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    expect(typeof result1).toBe("string");
    expect(typeof result2).toBe("string");
  });

  it("should handle invalid date gracefully", () => {
    const invalidDate = "invalid-date";
    const result = formatDate(invalidDate);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should handle empty string", () => {
    const emptyDate = "";
    const result = formatDate(emptyDate);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });
});
