let tree = [
  { name: 'A' },
  { name: 'B', children: [{ name: 'A' }, { name: 'AA', children: [] }] },
  { name: 'C' }
];

function filter(tree, str) {
  if (!tree || !tree.length) {
    return [];
  }
  const newChildren = [];
  for (const node of tree) {
    if (node.name === str) {
      newChildren.push({
        name: node.name,
        children: filter(node.children, str)
      });
    } else {
      let subs = filter(node.children, str);
      if (subs.length) {
        newChildren.push({
          name: node.name,
          children: subs
        });
      }
    }
  }
  return newChildren;
}

console.log(filter(tree, 'AA'));

setTimeout(console.log, 3600 * 60);
