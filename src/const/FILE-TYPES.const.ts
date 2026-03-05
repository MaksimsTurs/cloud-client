export default {
  EXTENTIONS: {
    TEXT_FILES: new Set<string>([
      "txt",
      "js",
      "jsx",
      "ts",
      "tsx",
      "cpp",
      "c",
      "h",
      "hpp",
      "py",
      "ini",
      "toml",
      "yaml",
      "py",
      "rs",
      "java",
      "asm"
    ]),
    VIDEO_FILES: new Set<string>([
      "mp4",
      "webm",
      "m4v",
      "mov",
    ]),
    AUDIO_FILES: new Set<string>([
      "mp3",
    ]),
    IMAGE_FILES: new Set<string>([
      "jpg",
      "jpeg",
      "webp",
      "gif",
      "png",
      "avif"
    ]),
    BINARY_FILES: new Set<string>([
      "pdf"
    ])
  },
  MIME_TYPES: {
    TEXT_FILES: "text/*",
    VIDEO_FILES: "video/*",
    AUDIO_FILES: "audio/*",
    IMAGE_FILES: "image/*",
    BINARY_FILES: "application/*"
  }
};
