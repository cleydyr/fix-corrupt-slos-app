import { SavedObjectSearchResult } from "./types";

export function processCode(code: string): string | undefined {
  try {
    const searchResults = JSON.parse(code) as SavedObjectSearchResult;

    const savedObjects = searchResults.saved_objects;

    const commands = savedObjects.map((savedObject) => {
      const { id, attributes } = savedObject;

      const newAttributes = {
        attributes: {
          ...attributes,
          groupBy: '*'
        }
      };

      return `PUT kbn:/api/saved_objects/slo/${id}\n${JSON.stringify(newAttributes, null, 2)}\n\nPOST kbn:/api/observability/slos/${id}/_reset`;
    });

    return commands.join("\n\n");
  } catch (error) {
    return undefined;
  }
}
