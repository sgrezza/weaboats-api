type ShipDrop = {
  dropNote: string;
  dropLocations: string[];
  constructionCategories: {
    limited: boolean;
    exchange: boolean;
  };
  constructionNote: string;
};
type Availability =
  | "Drop Only"
  | "Drop/Construction"
  | "Construction"
  | "Drops during Event"
  | "Event Construction"
  | "Available in Research"
  | "Special"
  | "Munitions Shop"
  | "Exchange during Event";

export const determineIfAvailable = (data: ShipDrop, rarity: string): Availability => {
  if (data.constructionCategories === undefined) {
    // Can't/couldn't build
    if (data.dropLocations === undefined) {
      // Doesn't/didn't drop
      if (rarity === "Priority" || rarity === "Decisive") {
        // Ship is Priority
        return "Available in Research";
      } // Ship MIGHT have a constructionNote
      return "Special";
    }
    // They drop, but not construct
    if (data.dropNote !== undefined) {
      return "Drops during Event";
    }
    if (data.dropLocations !== undefined) {
      return "Drop Only";
    }
  }
  if (data.constructionCategories.limited !== undefined) {
    return "Event Construction";
  } else if (data.dropNote !== undefined) {
    if (
      data.constructionCategories.exchange &&
      Object.keys(data.constructionCategories).length === 1
    ) {
      // Only available in Munitions
      return "Munitions Shop";
    }
    if (data.dropNote !== "Building#Exchange") {
      // Ship is available in exhange AND other constructions
      return "Exchange during Event";
    }
    if (data.dropNote === "Building#Exchange") {
      return "Construction";
    }
  } else if (data.dropLocations === undefined) {
    return "Construction";
  }
  return "Drop/Construction"; // Has locations AND categories
};
