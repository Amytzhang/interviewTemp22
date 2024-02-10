function renderer(vnode, container) {
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
  container.appendChild(el);
}
export default renderer;
