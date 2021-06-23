<template>
  <div>
    <h1>This is the public event page</h1>
    <div>
        {{ $route.params.userLink }} / {{ $route.params.eventName }}
    </div>
  </div>
</template>