// Import Rivet types
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

// Import Txtai classes with any type to bypass TypeScript checking
const embeddings: any = require("../../txtai/embeddings.js");
const extractor: any = require("../../txtai/extractor.js");
const labels: any = require("../../txtai/labels.js");
const segmentation: any = require("../../txtai/segmentation.js");
const similarity: any = require("../../txtai/similarity.js");
const summary: any = require("../../txtai/summary.js");
const textractor: any = require("../../txtai/textractor.js");
const transcription: any = require("../../txtai/transcription.js");
const translation: any = require("../../txtai/translation.js");
const workflow: any = require("../../txtai/workflow.js");

// Map operations to Txtai modules
const txtaiModules: { [key: string]: any } = {
  embeddings,
  extractor,
  labels,
  segmentation,
  similarity,
  summary,
  textractor,
  transcription,
  translation,
  workflow
};

// TxtaiNode and TxtaiNodeData types
type TxtaiNode = ChartNode<"txtai", TxtaiNodeData>;

type TxtaiNodeData = {
  operation: string;
  parameters: any[];
  useOperationInput?: boolean;
  useParametersInput?: boolean;
};

// Extended Inputs type
interface ExtendedInputs extends Inputs {
  operation?: { value: string };
  parameters?: { value: any[] };
}

// Txtai Plugin Node Definition
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

    // Define input and output ports
    getInputDefinitions(): NodeInputDefinition[] {
      return [
        {
          id: "operation" as PortId,
          dataType: "string",
          title: "Operation",
        },
        {
          id: "parameters" as PortId,
          dataType: "any",
          title: "Parameters",
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
        {
          id: "debugOutput" as PortId,  // Debug port
          dataType: "string",
          title: "Debug Output",
        },
      ];
    },

    // Define UI elements
    getUIData(): NodeUIData {
      return {
        contextMenuTitle: "Txtai Node",
        group: "AI",
        infoBoxBody: "Perform various NLP tasks.",
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
      inputData: ExtendedInputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      // Additional Debugging Checks
      console.log(`Input Data: ${JSON.stringify(inputData)}`);

      const operation = inputData.operation?.value || data.operation;
      const parameters = inputData.parameters?.value || data.parameters;

      console.log(`Operation: ${operation}`);
      console.log(`Parameters: ${JSON.stringify(parameters)}`);

      let output: any;

      const module = txtaiModules[operation];
      
      console.log(`Module: ${JSON.stringify(module)}`);
      console.log(`Module Operation Function Type: ${typeof module?.[operation]}`);

      if (module && Array.isArray(parameters)) {
        if (typeof module[operation] === 'function') {
          output = await module[operation](...parameters);
        } else {
          output = "Invalid operation in module";
        }
      } else {
        output = "Invalid operation or parameters";
      }

      console.log(`Output: ${JSON.stringify(output)}`);

      const debugInfo = `Operation: ${operation}, Parameters: ${JSON.stringify(parameters)}`;
  
      return {
        outputData: {
          type: 'any',
          value: output,
        },
        debugOutput: {  // Debug output
          type: 'string',
          value: debugInfo,
        },
      } as Outputs;
    },
  };
    return rivet.pluginNodeDefinition(TxtaiNodeImpl, "Txtai Node");
}