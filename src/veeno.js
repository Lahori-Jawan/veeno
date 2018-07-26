import noUiSlider from 'nouislider'

let events = ['start', 'slide', 'update', 'change', 'set', 'end']

export default {
  name: 'veeno',
  props: {
    inputClass: {
      type: String,
      default: 'custom-slider-input'
    },
    inputName: {
      type: String,
      default: 'custom-slider-value'
    },
    options: {
      type: Object,
      default: () => ({
        start: [20, 80],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      })
    },
    vertical: {
      type: Boolean,
      default: false
    },
    handles: {
      type: [Number, Array],
      default: null
    },
    connect: {
      type: [Boolean, Array], 
      default: false    // validate values are boolean
    },
    tooltips: {
      type: [Boolean, Array], 
      default: false    // validate values are boolean
    },
    step: {
      type: Number,
      default: 0
    },
    range: {
      type: Object,
      required: true,
      validator: (value) => (!Array.isArray(value) && typeof value === 'object')
    },
    pipsy: {
      type: [Boolean, Object],
      default: () => false,
      validator: (value) => (typeof value === 'boolean' || !Array.isArray(value) && typeof value === 'object')
    },
    rtl: {
      type: Boolean,
      default: false 
    },
    // test below (set) prop for both types i.e. Number, Array
    set: {
      type: [Number, Array],
      default: null,
      validator: (value) => (typeof value === 'number' || Array.isArray(value))
    },
    behaviour: {
      type: String,
      default: 'tap',
      validator: (value) => ['drag', 'tap', 'fixed', 'snap', 'none'].indexOf( value !== -1)
    },
    getset: {
      type: Function,
      default: () => () => ''
    }
  },
  created () {
    this.optionz = Object.assign({}, 
      this.options, this.$props, 
      // this.vertical ? this.options.orientation = 'vertical': '',
      this.vertical && (this.options.orientation = 'vertical'),
      this.handles && (this.options.start = this.handles),
      this.rtl && (this.options.direction = 'rtl'),
      this.pipsy && !Object.keys(this.pipsy).length ? 
        this.options.pips = {mode: 'range',density: 5} : this.options.pips = this.pipsy
    )
  },
  mounted () {
    let slider = this.$el;
    this.options.orientation === 'vertical' && (slider.style.height = '100%')
    noUiSlider.create(slider, this.optionz)
    
    events.forEach(event => {
      slider.noUiSlider.on(event, (values, handle, unencoded, tap, positions) => {
        this.$emit(event, {values, handle, unencoded, tap, positions})
        event === 'update' && (this.$emit('input', values[handle]))
      })
    })
    this.getset(slider)
  },
  render (createElement) {
    let child = createElement('input', 
        {
          attrs: {
            'type': 'hidden',
            name:this.name,
          },
          class:this.inputClass 
        },
      )
    let span = createElement('span', spanOptions,this.$slots.default) 

    return createElement('div', 
    divOptions, 
    [
      child,
      span
    ])
  },
  data () {
    return {
      optionz: Object,
      latestHandleValue: null
    }
  },
  watch: {
    set (newValue) {
      // * reference: https://refreshless.com/nouislider/slider-read-write/
      this.$el.noUiSlider.set(newValue)
    }
  }
}

let divOptions = {
    style: {
      position: 'relative'
    },
    class: {
      'veeno': true
    },
    attrs: { name:'custom-slider' }
}

let spanOptions = {
  style: {
    position: 'absolute',
    top: '-2.5rem'
  },
  class: {
    'veeno-span': true
  }
}