export const getWidgetDisplayPosition = (list, widgetName) => {
  let zIndex = 0;
  list.map((widget, index) => {
    if (widget === widgetName) {
      zIndex = index;
    }
  });
  return zIndex;
};
