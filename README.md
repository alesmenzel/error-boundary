# Error Boundary

Simple implementation of [React's Error Boundary](https://reactjs.org/docs/error-boundaries.html).

## Installation

```bash
npm install @alesmenzel/error-boundary
```

## Usage

```js
function App({ name }) {
  return (
    <ErrorBoundary
      onError={(error, info) => /* optionally, send to your favourite logger */ }
      fallback={({error, retry}) => <NoAvatar />}
      // or
      fallback={<NoAvatar />}
    >
      <Avatar name={name}/>
    </ErrorBoundary>
  )
}
```
