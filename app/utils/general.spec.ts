import { removeLastTrailingSlash } from "./general";

describe("removeLastTrailingSlash", () => {
  it("should remove last trailing slash from an url", () => {
    const mockUrl = "http://admin.bluetifulplanet.local/about-me/";
    const urlUpdated = removeLastTrailingSlash(mockUrl);
    expect(urlUpdated).toBe("http://admin.bluetifulplanet.local/about-me");
  });
  it("should return same value if it's not a string", () => {
    const mockUrl = ["http://admin.bluetifulplanet.local/about-me/"];
    const urlUpdated = removeLastTrailingSlash(mockUrl as unknown as string);
    expect(urlUpdated).toBe(mockUrl);
  });
});
