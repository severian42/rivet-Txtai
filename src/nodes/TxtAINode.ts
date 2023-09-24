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
  useOperationInput?: boolean;
  useParametersInput?: boolean;
};

// Your extended Inputs type
interface ExtendedInputs extends Inputs {
  operation?: { value: string };
  parameters?: { value: any[] };
}

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
      return [
        {
          id: "operation" as PortId,
          dataType: "string",
          title: "Operation",
        },
        {
          id: "parameters" as PortId,
          dataType: "any",
          title: "Data",
        },
      ];
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
            { value: "extractor", label: "Extractor" },
            { value: "transcription", label: "Transcription" },
            { value: "summarization", label: "Text Summarization" },
            { value: "sentiment", label: "Sentiment Analysis" },
            { value: "translation", label: "Language Translation" },
            { value: "classification", label: "Text Classification" },
            { value: "embedding", label: "Text Embedding" },
            { value: "search", label: "Text Search" },
            { value: "tokenization", label: "Tokenization" },
            { value: "namedEntity", label: "Named Entity Recognition" }
          ],
        },
        {
          type: "stringList",
          dataKey: "parameters",
          label: "Data",
        },
      ];
    },

    getBody(data: TxtaiNodeData): string {
      return `Txtai Node\nOperation: ${data.operation}\nParameters: ${JSON.stringify(data.parameters)}`;
    },
  
    async process(
      data: TxtaiNodeData,
      inputData: Inputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      // Using optional chaining and type assertion
      const operation = (inputData as ExtendedInputs)["operation"]?.value || data.operation;
      const parameters = (inputData as ExtendedInputs)["parameters"]?.value || data.parameters;

    
      let output: any;
    
      if (txtai[operation] && Array.isArray(parameters)) {
        output = await txtai[operation](...parameters);
      } else {
        output = "Invalid operation or parameters";
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