interface SavedObject {
  id: string;
  attributes: object;
}

export interface SavedObjectSearchResult {
  saved_objects: SavedObject[];
}
