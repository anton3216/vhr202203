import axiosUtil from './axiosUtil.js';

export const initMenu = function(router, store) {
  if (store.state.routes.length > 0) {
    return;
  }
  axiosUtil.getRequest("/system/config/menus").then(resp => {
    if (resp) {
      let initFormatRouters = formatRouters(resp.obj);
      router.addRoutes(initFormatRouters);
      store.commit('initRoutes',initFormatRouters);
    }
  });
}

export const formatRouters = (obj) => {
  let fmRouters = [];
  obj.forEach(o => {
    let {
      path,
      name,
      iconCls,
      component,
      meta,
      children
    } = o;

    if (children && children instanceof Array) {
      children = formatRouters(children);
    }

    let fmRouter = {
      path,
      name,
      iconCls,
      meta,
      children,
      component(cast) {
        if (component.startsWith('Home')) {
          require(['../components/' + component + '.vue'], cast);
        } else if (component.startsWith('Emp')) {
          require(['../components/emp/' + component + '.vue'], cast);
        } else if (component.startsWith('Per')) {
          require(['../components/per/' + component + '.vue'], cast);
        } else if (component.startsWith('Sal')) {
          require(['../components/sal/' + component + '.vue'], cast);
        } else if (component.startsWith('Sta')) {
          require(['../components/sta/' + component + '.vue'], cast);
        } else if (component.startsWith('Sys')) {
          require(['../components/sys/' + component + '.vue'], cast);
        }
      }
    }
    fmRouters.push(fmRouter);
  });
  return fmRouters;
}
