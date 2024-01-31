import { useState } from "react"

interface SavedObject {
  id: string;
  attributes: object;
}

interface SavedObjectSearchResult {
  saved_objects: SavedObject[]
}

function processCode(code: string): string | undefined {
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
    console.log(error);

    return undefined;
  }
}


function App() {
  const [code, setCode] = useState("");

  const output = code === "" ? "" : (processCode(code) ?? "Malformed JSON");

  return (
    <>
      <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}>
          <div id="left_side_editor" style={{
            height: "70%",
            width: "50%",
            paddingRight: "16px",
          }}>
            <h1>Input</h1>
            <textarea style={
              {
                width: "100%",
                height: "100%",
                resize: "none",
                fontFamily: "monospace",
              }
            }
            onChange={(event) => {
              setCode(event.target.value);
            }}>

            </textarea>
          </div>
          <div id="right_side_output" style={{
            height: "70%",
            width: "50%",
          }}>
            <h1>Output</h1>
            <textarea style={
              {
                width: "100%",
                height: "100%",
                resize: "none",
                fontFamily: "monospace",
              }
            }
            disabled
            value={output}>
            </textarea>

          </div>
        </div>
    </>
  )
}

export default App
