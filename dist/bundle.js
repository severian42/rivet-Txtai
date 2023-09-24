var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// txtai/api.js
var API, api_default;
var init_api = __esm({
  "txtai/api.js"() {
    "use strict";
    API = class {
      /**
       * Creates an API instance.
       * 
       * @param url base url
       */
      constructor(url) {
        this.url = url;
      }
      /**
       * Executes a get request.
       * 
       * @param method api method
       * @param params query parameters
       * @return response
       */
      async get(method, params) {
        let url = `${this.url}/${method}`;
        if (params) {
          url += `?${new URLSearchParams(params)}`;
        }
        let res = await fetch(url);
        return res.ok ? await res.json() : Promise.reject(`${res.status} ${res.statusText}`);
      }
      /**
       * Executes a post request.
       * 
       * @param method api method
       * @param params post parameters
       * @return response
       */
      async post(method, params) {
        let url = `${this.url}/${method}`;
        let res = await fetch(url, {
          method: "post",
          body: JSON.stringify(params),
          headers: { "content-type": "application/json" }
        });
        return res.ok ? await res.json() : Promise.reject(`${res.status} ${res.statusText}`);
      }
    };
    api_default = API;
  }
});

// txtai/embeddings.js
var embeddings_exports = {};
__export(embeddings_exports, {
  default: () => embeddings_default
});
var Embeddings, embeddings_default;
var init_embeddings = __esm({
  "txtai/embeddings.js"() {
    "use strict";
    init_api();
    Embeddings = class extends api_default {
      /**
       * Finds documents in the embeddings model most similar to the input query. Returns
       * a list of {id: value, score: value} sorted by highest score, where id is the
       * document id in the embeddings model.
       * 
       * @param query query text
       * @param limit maximum results (defaults to 10)
       * @return list of {id: value, score: value}
       */
      async search(query, limit = 10) {
        return await this.get("search", { query, limit }).catch((e) => {
          throw e;
        });
      }
      /**
       * Finds documents in the embeddings model most similar to the input queries. Returns
       * a list of {id: value, score: value} sorted by highest score per query, where id is
       * the document id in the embeddings model.
       *
       * @param queries queries text
       * @param limit maximum results (defaults to 10)
       * @return list of {id: value, score: value} per query
       */
      async batchsearch(queries, limit = 10) {
        return await this.post("batchsearch", { queries, limit }).catch((e) => {
          throw e;
        });
      }
      /**
       * Adds a batch of documents for indexing.
       * 
       * @param documents list of {id: value, text: value}
       */
      async add(documents) {
        await this.post("add", documents).catch((e) => {
          throw e;
        });
      }
      /**
       * Builds an embeddings index for previously batched documents.
       */
      async index() {
        await this.get("index", null).catch((e) => {
          throw e;
        });
      }
      /**
       * Runs an embeddings upsert operation for previously batched documents.
       */
      async upsert() {
        await this.get("upsert", null).catch((e) => {
          throw e;
        });
      }
      /**
       * Deletes from an embeddings index. Returns list of ids deleted.
       *
       * @param ids list of ids to delete
       * @return ids deleted
       */
      async delete(ids) {
        return await this.post("delete", ids).catch((e) => {
          throw e;
        });
      }
      /**
       * Total number of elements in this embeddings index.
       *
       * @return number of elements in embeddings index
       */
      async count() {
        return await this.get("count", null).catch((e) => {
          throw e;
        });
      }
      /**
       * Computes the similarity between query and list of text. Returns a list of
       * {id: value, score: value} sorted by highest score, where id is the index
       * in texts.
       *
       * @param query query text
       * @param texts list of text
       * @return list of {id: value, score: value}
       */
      async similarity(query, texts) {
        return await this.post("similarity", { query, texts }).catch((e) => {
          throw e;
        });
      }
      /**
       * Computes the similarity between list of queries and list of text. Returns a list
       * of {id: value, score: value} sorted by highest score per query, where id is the
       * index in texts.
       * 
       * @param queries queries text
       * @param texts list of text
       * @return list of {id: value, score: value} per query
       */
      async batchsimilarity(queries, texts) {
        return await this.post("batchsimilarity", { queries, texts }).catch((e) => {
          throw e;
        });
      }
      /**
       * Transforms text into an embeddings array.
       *
       * @param text input text
       * @return embeddings array
       */
      async transform(text) {
        return await this.get("transform", { text }).catch((e) => {
          throw e;
        });
      }
      /**
       * Transforms list of text into embeddings arrays.
       *
       * @param texts list of text
       * @return embeddings array
       */
      async batchtransform(texts) {
        return await this.post("batchtransform", texts).catch((e) => {
          throw e;
        });
      }
    };
    embeddings_default = Embeddings;
  }
});

// txtai/extractor.js
var extractor_exports = {};
__export(extractor_exports, {
  default: () => extractor_default
});
var Extractor, extractor_default;
var init_extractor = __esm({
  "txtai/extractor.js"() {
    "use strict";
    init_api();
    Extractor = class extends api_default {
      /**
       * Extracts answers to input questions.
       * 
       * @param queue list of {name: value, query: value, question: value, snippet: value}
       * @param texts list of text
       * @return list of {name: value, answer: value}
       */
      async extract(queue, texts) {
        return await this.post("extract", { queue, texts }).catch((e) => {
          throw e;
        });
      }
    };
    extractor_default = Extractor;
  }
});

// txtai/labels.js
var labels_exports = {};
__export(labels_exports, {
  default: () => labels_default
});
var Labels, labels_default;
var init_labels = __esm({
  "txtai/labels.js"() {
    "use strict";
    init_api();
    Labels = class extends api_default {
      /**
       * Applies a zero shot classifier to text using a list of labels. Returns a list of
       * {id: value, score: value} sorted by highest score, where id is the index in labels.
       * 
       * @param text input text
       * @param labels list of labels
       * @return list of {id: value, score: value} per text element
       */
      async label(text, labels2) {
        return await this.post("label", { text, labels: labels2 }).catch((e) => {
          throw e;
        });
      }
      /**
       * Applies a zero shot classifier to list of text using a list of labels. Returns a list of
       * {id: value, score: value} sorted by highest score, where id is the index in labels per
       * text element.
       *
       * @param texts list of texts
       * @param labels list of labels
       * @return list of {id: value score: value} per text element
       */
      async batchlabel(texts, labels2) {
        return await this.post("batchlabel", { texts, labels: labels2 }).catch((e) => {
          throw e;
        });
      }
    };
    labels_default = Labels;
  }
});

// txtai/segmentation.js
var segmentation_exports = {};
__export(segmentation_exports, {
  default: () => segmentation_default
});
var Segmentation, segmentation_default;
var init_segmentation = __esm({
  "txtai/segmentation.js"() {
    "use strict";
    init_api();
    Segmentation = class extends api_default {
      /**
       * Segments text into semantic units.
       * 
       * @param text input text
       * @return segmented text
       */
      async segment(text) {
        return await this.get("segment", { text }).catch((e) => {
          throw e;
        });
      }
      /**
       * Segments text into semantic units.
       * 
       * @param texts list of texts to segment
       * @return list of segmented text
       */
      async batchsegment(texts) {
        return await this.post("batchsegment", texts).catch((e) => {
          throw e;
        });
      }
    };
    segmentation_default = Segmentation;
  }
});

// txtai/similarity.js
var similarity_exports = {};
__export(similarity_exports, {
  default: () => similarity_default
});
var Similarity, similarity_default;
var init_similarity = __esm({
  "txtai/similarity.js"() {
    "use strict";
    init_api();
    Similarity = class extends api_default {
      /**
       * Computes the similarity between query and list of text. Returns a list of
       * {id: value, score: value} sorted by highest score, where id is the index
       * in texts.
       *
       * @param query query text
       * @param texts list of text
       * @return list of {id: value, score: value}
       */
      async similarity(query, texts) {
        return await this.post("similarity", { query, texts }).catch((e) => {
          throw e;
        });
      }
      /**
       * Computes the similarity between list of queries and list of text. Returns a list
       * of {id: value, score: value} sorted by highest score per query, where id is the
       * index in texts.
       *
       * @param queries queries text
       * @param texts list of text
       * @return list of {id: value, score: value} per query
       */
      async batchsimilarity(queries, texts) {
        return await this.post("batchsimilarity", { queries, texts }).catch((e) => {
          throw e;
        });
      }
    };
    similarity_default = Similarity;
  }
});

// txtai/summary.js
var summary_exports = {};
__export(summary_exports, {
  default: () => summary_default
});
var Summary, summary_default;
var init_summary = __esm({
  "txtai/summary.js"() {
    "use strict";
    init_api();
    Summary = class extends api_default {
      /**
       * Runs a summarization model against a block of text.
       *
       * @param text text to summarize
       * @param minlength minimum length for summary
       * @param maxlength maximum length for summary
       * @return summary text
       */
      async summary(text, minlength, maxlength) {
        let params = { text };
        if (minlength) {
          params.minlength = minlength;
        }
        if (maxlength) {
          params.maxlength = maxlength;
        }
        return await this.get("summary", params).catch((e) => {
          throw e;
        });
      }
      /**
       * Runs a summarization model against a block of text.
       *
       * @param texts list of text to summarize
       * @param minlength minimum length for summary
       * @param maxlength maximum length for summary
       * @return list of summary text
       */
      async batchsummary(texts, minlength, maxlength) {
        let params = { texts };
        if (minlength) {
          params.minlength = minlength;
        }
        if (maxlength) {
          params.maxlength = maxlength;
        }
        return await this.post("batchsummary", params).catch((e) => {
          throw e;
        });
      }
    };
    summary_default = Summary;
  }
});

// txtai/textractor.js
var textractor_exports = {};
__export(textractor_exports, {
  default: () => textractor_default
});
var Textractor, textractor_default;
var init_textractor = __esm({
  "txtai/textractor.js"() {
    "use strict";
    init_api();
    Textractor = class extends api_default {
      /**
       * Extracts text from a file at path.
       * 
       * @param file file to extract text
       * @return extracted text
       */
      async textract(file) {
        return await this.get("textract", { file }).catch((e) => {
          throw e;
        });
      }
      /**
       * Extracts text from a file at path.
       * 
       * @param files list of files to extract text
       * @return list of extracted text
       */
      async batchtextract(files2) {
        return await this.post("batchtextract", files2).catch((e) => {
          throw e;
        });
      }
    };
    textractor_default = Textractor;
  }
});

// txtai/transcription.js
var transcription_exports = {};
__export(transcription_exports, {
  default: () => transcription_default
});
var Transcription, transcription_default;
var init_transcription = __esm({
  "txtai/transcription.js"() {
    "use strict";
    init_api();
    Transcription = class extends api_default {
      /**
       * Transcribes audio files to text.
       * 
       * @param file file to transcribe
       * @return transcribed text
       */
      async transcribe(file) {
        return await this.get("transcribe", { file }).catch((e) => {
          throw e;
        });
      }
      /**
       * Transcribes audio files to text.
       * 
       * @param files list of files to transcribe
       * @return list of transcribed text
       */
      async batchtranscribe(files2) {
        return await this.post("batchtranscribe", files2).catch((e) => {
          throw e;
        });
      }
    };
    transcription_default = Transcription;
  }
});

// txtai/translation.js
var translation_exports = {};
__export(translation_exports, {
  default: () => translation_default
});
var Translation, translation_default;
var init_translation = __esm({
  "txtai/translation.js"() {
    "use strict";
    init_api();
    Translation = class extends api_default {
      /**
       * Translates text from source language into target language.
       * 
       * @param text text to translate
       * @param target target language code, defaults to "en"
       * @param source source language code, detects language if not provided
       * @return translated text
       */
      async translate(text, target, source) {
        let params = { text };
        if (target) {
          params.target = target;
        }
        if (source) {
          params.source = source;
        }
        return await this.get("translate", params).catch((e) => {
          throw e;
        });
      }
      /**
       * Translates text from source language into target language.
       * 
       * @param texts list of text to translate
       * @param target target language code, defaults to "en"
       * @param source source language code, detects language if not provided
       * @return list of translated text
       */
      async batchtranslate(texts, target, source) {
        let params = { texts };
        if (target) {
          params.target = target;
        }
        if (source) {
          params.source = source;
        }
        return await this.post("batchtranslate", files).catch((e) => {
          throw e;
        });
      }
    };
    translation_default = Translation;
  }
});

// txtai/workflow.js
var workflow_exports = {};
__export(workflow_exports, {
  default: () => workflow_default
});
var Workflow, workflow_default;
var init_workflow = __esm({
  "txtai/workflow.js"() {
    "use strict";
    init_api();
    Workflow = class extends api_default {
      /**
       * Executes a named workflow using elements as input.
       *
       * @param name workflow name
       * @param elements list of elements to run through workflow
       * @return list of processed elements
       */
      async workflow(name, elements) {
        return await this.post("workflow", { name, elements }).catch((e) => {
          throw e;
        });
      }
    };
    workflow_default = Workflow;
  }
});

// src/nodes/TxtAINode.ts
var embeddings = (init_embeddings(), __toCommonJS(embeddings_exports));
var extractor = (init_extractor(), __toCommonJS(extractor_exports));
var labels = (init_labels(), __toCommonJS(labels_exports));
var segmentation = (init_segmentation(), __toCommonJS(segmentation_exports));
var similarity = (init_similarity(), __toCommonJS(similarity_exports));
var summary = (init_summary(), __toCommonJS(summary_exports));
var textractor = (init_textractor(), __toCommonJS(textractor_exports));
var transcription = (init_transcription(), __toCommonJS(transcription_exports));
var translation = (init_translation(), __toCommonJS(translation_exports));
var workflow = (init_workflow(), __toCommonJS(workflow_exports));
var txtaiModules = {
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
function txtaiPluginNode(rivet) {
  const TxtaiNodeImpl = {
    create() {
      return {
        id: rivet.newId(),
        data: {
          operation: "",
          parameters: []
        },
        title: "Txtai Node",
        type: "txtai",
        visualData: {
          x: 0,
          y: 0,
          width: 200
        }
      };
    },
    // Define input and output ports
    getInputDefinitions() {
      return [
        {
          id: "operation",
          dataType: "string",
          title: "Operation"
        },
        {
          id: "parameters",
          dataType: "any",
          title: "Parameters"
        }
      ];
    },
    getOutputDefinitions() {
      return [
        {
          id: "outputData",
          dataType: "any",
          title: "Output Data"
        },
        {
          id: "debugOutput",
          // Debug port
          dataType: "string",
          title: "Debug Output"
        }
      ];
    },
    // Define UI elements
    getUIData() {
      return {
        contextMenuTitle: "Txtai Node",
        group: "AI",
        infoBoxBody: "Perform various NLP tasks.",
        infoBoxTitle: "Txtai Node"
      };
    },
    getEditors() {
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
          ]
        },
        {
          type: "stringList",
          dataKey: "parameters",
          label: "Data"
        }
      ];
    },
    getBody(data) {
      return `Txtai Node
Operation: ${data.operation}
Parameters: ${JSON.stringify(data.parameters)}`;
    },
    async process(data, inputData, _context) {
      console.log(`Input Data: ${JSON.stringify(inputData)}`);
      const operation = inputData.operation?.value || data.operation;
      const parameters = inputData.parameters?.value || data.parameters;
      console.log(`Operation: ${operation}`);
      console.log(`Parameters: ${JSON.stringify(parameters)}`);
      let output;
      const module = txtaiModules[operation];
      console.log(`Module: ${JSON.stringify(module)}`);
      console.log(`Module Operation Function Type: ${typeof module?.[operation]}`);
      if (module && Array.isArray(parameters)) {
        if (typeof module[operation] === "function") {
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
          type: "any",
          value: output
        },
        debugOutput: {
          // Debug output
          type: "string",
          value: debugInfo
        }
      };
    }
  };
  return rivet.pluginNodeDefinition(TxtaiNodeImpl, "Txtai Node");
}

// src/index.ts
var initializer = (rivet) => {
  const txtaiNode = txtaiPluginNode(rivet);
  const plugin = {
    id: "rivet-plugin-txtai",
    // Unique ID
    name: "Rivet Plugin for txtai",
    // Display name
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai"
      }
    ],
    register: (register) => {
      register(txtaiNode);
    }
  };
  return plugin;
};
var src_default = initializer;
export {
  src_default as default
};
