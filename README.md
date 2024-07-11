# React server features demo

Demo of minimal setup React for server features.

## React features

State of react features in demo:
- [x] RSC
- [x] SSR
- [x] Client components
- [] `use()` to process promise on client
- [] Routing
- [] Server actions
- [] Partial refetching

## Usage

Build client code:
```bash
pnpm bd
```

Run RSC server:
```bash
pnpm st:rsc
```

Run SSR server:
```bash
pnpm st:ssr
```

Run RSC and SSR server:
```bash
pnpm st
```

Build client code and run RSC and SSR server:
```bash
pnpm bs
```

After running `pnpm bd && pnpm st` or `pnpm bs` open `localhost:3010`.

## FAQ

### How to update libraries to lates RC?
Update `react`, `react-dom` and `react-server-dom-webpack` to latest RC version.
```bash
pnpm upd
```

### How to remove `Error: Element type is invalid: expected a string ...` on server and in html?
You need to add following code to all client components:
```js
module.exports = ComponentName
```
and replace `ComponentName` to name of your client component.


### How to remove `autoclient0.js` fetching on client?
You need to modify `react-ssr-manifest.json` on server after reading file:
```js
reactSsrManifest.moduleLoading.prefix = "/dist/"
```

### What is the issue with `use()` to process promise on client?
`use()` with promise blocks rendering of all clients components util promise completes.
