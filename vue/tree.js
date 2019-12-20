let activeInstance = null;

class Tree {
  constructor({ val }) {
    this.children = [];
    this.val = val;
  }
}

const restoreActiveInstance = vm => {
  let prevActiveInstance = activeInstance;
  activeInstance = vm;
  return () => {
    activeInstance = prevActiveInstance;
  };
};

const mock = {
  children: [
    {
      children: [{}],
      val: 1
    },
    {
      children: [
        {
          children: [{}],
          val: 4
        }
      ],
      val: 2
    },
    {
      children: [{}],
      val: 3
    }
  ],
  val: 1
};

const build = mock => {
  let node = new Tree(mock);

  if (activeInstance) {
    activeInstance.children.push(node);
  }

  const reset = restoreActiveInstance(node);

  if (mock.children && mock.children.length > 0) {
    mock.children.forEach(element => {
      build(element);
    });
  }

  reset();

  return node;
};

let node = build(mock);

console.log(node);

setTimeout(console.log, 3600 * 12);

function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // This vnode was used in a previous render!
    // now it's used as a new node, overwriting its elm would cause
    // potential patch errors down the road when it's used as an insertion
    // reference node. Instead, we clone the node on-demand before creating
    // associated DOM element for it.
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  vnode.isRootInsert = !nested; // for transition enter check
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return;
  }

  const data = vnode.data;
  const children = vnode.children;
  const tag = vnode.tag;
  if (isDef(tag)) {

    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode);
    setScope(vnode);

    createChildren(vnode, children, insertedVnodeQueue);
    if (isDef(data)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
    }
    insert(parentElm, vnode.elm, refElm);

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--;
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  }
}
