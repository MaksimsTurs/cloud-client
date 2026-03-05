export default function(alias: Record<string, string>) {
  return { 
    extensions: [".ts", ".tsx"], 
    alias,
  };
};