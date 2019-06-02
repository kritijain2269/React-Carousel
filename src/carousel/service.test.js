import { getImages } from "./service";

describe("carousel service", () => {
  beforeEach(() => {
    fetch = jest.fn(Promise.resolve({ response: {} }));
  });

  it("renders without crashing", () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    getImages();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
