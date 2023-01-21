import { findMenuByLocation, parseHierarchicalMenu } from "./menus";
import { mockAllMenusNodes, mockMenuLinks, mockMenuNodes } from "@mocks/menus.mock";

describe("parseHierarchicalMenu", () => {
  it("should resturn a hierarchical menu from the graphQL menu nodes.", () => {
    const menuLinks = parseHierarchicalMenu(mockMenuNodes);
    expect(menuLinks).toEqual(mockMenuLinks);
  });
});

describe('findMenuByLocation', () => {
  it('should return the menuLinks of especific location from the menu graphql query', () => {
    const menuLinks = findMenuByLocation(mockAllMenusNodes, 'MAIN_MENU');
    expect(menuLinks).toEqual(mockMenuLinks);
  })
  it('should return an empty array if location is not fouded.', () => {
    const menuLinks = findMenuByLocation(mockAllMenusNodes, 'SECONDARY_MENU');
    expect(menuLinks).toEqual([]);
  })
})