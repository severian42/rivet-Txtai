import type {
  ChartNode,
  EditorDefinition,
  Inputs,
  InternalProcessContext,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  PluginNodeImpl,
  Outputs,
  PortId,
  Project,
  Rivet,
  NodeUIData,
  NodeConnection,
} from "@ironclad/rivet-core";

// @ts-ignore
import * as txtai from "../../txtai/index.js";

type TxtaiNode = ChartNode<"txtai", TxtaiNodeData>;

type TxtaiNodeData = {
  operation: string;
  parameters: any[];
  llmQuery: string;  // Added for LLM
  useOperationInput?: boolean;
  useParametersInput?: boolean;
};

export function txtaiPluginNode(rivet: typeof Rivet) {
  const TxtaiNodeImpl: PluginNodeImpl<TxtaiNode> = {
    create(): TxtaiNode {
      return {
        id: rivet.newId<NodeId>(),
        data: {
          operation: "",
          parameters: [],
        },
        title: "Txtai Node",
        type: "txtai",
        visualData: {
          x: 0,
          y: 0,
          width: 200,
        },
      };
    },

    getInputDefinitions(
      data: TxtaiNodeData,
      _connections: NodeConnection[],
      _nodes: Record<NodeId, ChartNode>,
      _project: Project
    ): NodeInputDefinition[] {
      const inputs: NodeInputDefinition[] = [];

      if (data.useOperationInput) {
        inputs.push({
          id: "operation" as PortId,
          dataType: "string",
          title: "Operation",
        });
      }

      if (data.useParametersInput) {
        inputs.push({
          id: "parameters" as PortId,
          dataType: "any",
          title: "Parameters",
        });
      }

      if (data.llmQuery) {
        inputs.push({
          id: "llmQuery" as PortId,
          dataType: "string",
          title: "LLM Query",
        });
      }

      return inputs;
    },

    getOutputDefinitions(): NodeOutputDefinition[] {
      return [
        {
          id: "outputData" as PortId,
          dataType: "any",
          title: "Output Data",
        },
      ];
    },

    getUIData(): NodeUIData {
      return {
        contextMenuTitle: "Txtai",
        group: "AI",
        infoBoxBody: "Txtai Node",
        infoBoxTitle: "Txtai Node",
      };
    },

    getEditors(): EditorDefinition<TxtaiNode>[] {
      return [
        {
          type: "dropdown",
          dataKey: "operation",
          label: "Operation",
          options: [
            { value: "textractor", label: "Text Extraction" },
            // ... (existing operations)
          ],
        },
        {
          type: "stringList",
          dataKey: "parameters",
          label: "Parameters",
        },
        {
          type: "string",
          dataKey: "llmQuery",
          label: "LLM Query",
        },
      ];
    },

    getBody(data: TxtaiNodeData): string {
      return rivet.dedent`
        Txtai Node
        Operation: ${data.useOperationInput ? "(Using Input)" : data.operation}
        Parameters: ${data.useParametersInput ? "(Using Input)" : JSON.stringify(data.parameters)}
      `;
    },

    async process(
      data: TxtaiNodeData,
      inputData: Inputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      const operation = rivet.getInputOrData(
        data,
        inputData,
        "operation",
        "string"
      );
      const parameters = rivet.getInputOrData(
        data,
        inputData,
        "parameters",
        "any"
      ) as any[];

      const llmQuery = rivet.getInputOrData(
        data,
        inputData,
        "llmQuery",
        "string"
      );
      
      let output: any;
      
      if (llmQuery) {
        // Process the LLM query here
        // This example uses the Txtai "search" operation as a placeholder for the LLM query.
        if (txtai['search']) {
          output = await txtai['search'](llmQuery, ...parameters);  // Replace this with the actual LLM query processing
        } else {
          output = "Invalid LLM query operation";
        }
      } else if (txtai[operation] && Array.isArray(parameters)) {
        output = await txtai[operation](...parameters);
      } else {
        output = "Invalid operation";
      }

      return {
        ["outputData" as PortId]: {
          type: "any",
          value: output,
        },
      };
    },
  };

  return rivet.pluginNodeDefinition(TxtaiNodeImpl, "Txtai Node");
}


  return rivet.pluginNodeDefinition(TxtaiNodeImpl, "Txtai Node");
}
