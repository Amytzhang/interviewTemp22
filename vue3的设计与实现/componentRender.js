function renderer(vnode, container) {
  if (typeof vnode.tag === "string") {
    //tag 元素标签
    mountElement(vnode, container);
  } else if (typeof vnode.tag === "function") {
    //tag 组件
    mountComponent(vnode, container);
  }
}
//处理标签
function mountElement(vnode, container) {
  //创建元素
  const el = document.createElement(vnode.tag);
  // props
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      //处理on开头的事件
      el.addEventListener(key.substr(2).toLocaleLowerCase(), vnode.props[key]);
    }
  }
  //style
  let style = "";
  for (const key in vnode.styles) {
    style += `${key}:${vnode.styles[key]};`;
  }
  el.setAttribute("style", style);
  //处理child
  if (typeof vnode.children == "string") {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    //递归处理array类型的child
    vnode.children.forEach((child) => {
      return renderer(child, el);
    });
  }
  //元素挂载
  container.appendChild(el);
}
//处理组件
function mountComponent(vnode, container) {
  //调用组件函数，获取组件要渲染的内容
  const subtree = vnode.tag();
  //递归调用renderer渲染subtree
  renderer(subtree, container);
}
export default renderer;
