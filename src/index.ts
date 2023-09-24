import { txtaiPluginNode } from "./nodes/TxtAINode"; // Import the TxtaiNode
import type { Rivet, RivetPlugin } from "@ironclad/rivet-core";

const initializer = (rivet: typeof Rivet) => {
  const txtaiNode = txtaiPluginNode(rivet);

  const plugin: RivetPlugin = {
    id: "rivet-plugin-txtai", // Unique ID
    name: "Rivet Plugin for txtai", // Display name
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai",
      },
    ],
    register: (register) => {
      register(txtaiNode); // Register TxtaiNode
    },
  };

  return plugin;
};
console.log
export default initializer;