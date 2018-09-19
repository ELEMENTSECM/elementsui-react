InfiniteList

```js
<InfiniteList locale="en" dataLength={20} hasMore={false}>
	{[ ...Array(20) ].map((_, i) => <div key={i}>Item {i}</div>)}
</InfiniteList>
```