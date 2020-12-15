if ('registerProperty' in CSS) {
  CSS.registerProperty({
    name: '--leaf-size',
    syntax: '<number>',
    inherits: false,
    initialValue: 16
  });

  CSS.registerProperty({
    name: '--leaf-color',
    syntax: '<color>',
    inherits: true,
    initialValue: '#73ce8f'
  });
}
