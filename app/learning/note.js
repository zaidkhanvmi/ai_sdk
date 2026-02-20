// Prompts
// In order to simplify prompting, the AI SDK supports text, message, and system prompts.

// 1) Text Prompts
const result = await generateText({
    model: "openai/o3-pro",
    prompt: 'Invent a new holiday and describe its traditions.',
});

// 2) System Prompts
// System prompts are the initial set of instructions given to models that help guide and constrain the models' behaviors and responses. You can set system prompts using the system property. System prompts work with both the prompt and the messages properties.

// 3) Message Prompts
// A message prompt is an array of user, assistant, and tool messages. They are great for chat interfaces and more complex, multi-modal prompts. You can use the messages property to set message prompts.

// Each message has a role and a content property. The content can either be text (for user and assistant messages), or an array of relevant parts (data) for that message type

// 4) Image Parts
// User messages can include image parts. An image can be one of the following:

// base64-encoded image:
// string with base-64 encoded content
// data URL string, e.g. data:image/png;base64,...
// binary image:
// ArrayBuffer
// Uint8Array
// Buffer
// URL:
// http(s) URL string, e.g. https://example.com/image.png
// URL object, e.g. new URL('https://example.com/image.png')