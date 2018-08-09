<h1 align="center">Player Sample Plugin</h1> <br>

<p align="center">
	Sample project to assist the walkthrough of creation an external plugin for Globo.com's Web Player
</p>


## Documentation

- Player Plugins: [http://player-docs.globoi.com/plugins/](http://player-docs.globoi.com/plugins/)
- Creating Plugins: [http://player-docs.globoi.com/plugins/creating_plugin](http://player-docs.globoi.com/plugins/creating_plugin)

## Organization

```
player-sample-plugin/
├── public/
│   ├─→ js/
│   ├── index.html
├── src/
│   ├── assets/
│   ├── index.js
│   ├── plugin.js
└── dist/
    └── ...
```

**public**

External project assets to setup the dev environment (index.html, js, ...)

**src**

The plugin code itself.

- `index.js`: entry point
- `plugin.js`: Plugin Class implementation

**dist**

Stores the generated code.

## Development

- `yarn install`: Install all project (dev)dependencies
- `yarn start`: Start a development server on `localhost:8082`
- `yarn build`: Transpiles the plugin and generates the output asset on `/dist` folder

### Troubleshooting

If you face some issues during some task (e.g.: `start`, `build`...) try to:

  - `rm -rf node_modules`
  - `yarn install`
  - Run task again

## License

Copyright (c) 2015-2020 Globo Comunicações e Participações S.A. All Rights Reserved.

<p align="center">
    <img alt="globo.com" title="globo.com" src="http://s.glbimg.com/en/ho/static/globo_com_2016/img/home_200x200.png" width="100">
</p>
