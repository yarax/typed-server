module.exports = function ({types: t}) {
  return {
    visitor: {
      GenericTypeAnnotation(path, state) {
        console.log(path.node.id && path.node.id.name);
        path.replaceWithSourceString('ХУЙ');
      },
    }
  };
}