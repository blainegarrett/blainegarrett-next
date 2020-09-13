export interface CodeLabResource {
  category: string;
  slug: string;
  title: string;
  description: string;
}

let index: CodeLabResource[] = [];
index.push({
  category: 'graphics',
  slug: 'asciiimage',
  title: 'ASCII Image Using HTML5 Canvas',
  description: 'sdfdsds',
});

index.push({
  category: 'graphics',
  slug: 'quantization',
  title: 'Image Quantization with HTML5 Canvas',
  description: 'sdfdsds',
});

export default index;
