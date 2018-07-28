# veeno

veeno is a range slider component for vue based off of 
[noUiSlider](https://github.com/leongersen/noUiSlider)
It supports all noUiSlider features.

## Installation

You can install the package via npm or yarn.

#### NPM

```npm install veeno --save```

#### YARN

```yarn add veeno```

## Usage

```vue
<template>
  <div id = "app">
    <veeno
        pipsy
        :handles = "35"
        :range = {
          'min': 0,
          'max': 100
        }
    />
  </div>
</template>

<script>
import veeno from 'veeno';

export default {
    name: 'app',
    components: {
        veeno,
    },
};
</script>
```

## More

For visual details, checkout the [homepage](http://veeno.surge.sh/) page