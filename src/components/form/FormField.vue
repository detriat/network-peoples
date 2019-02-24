<template>
    <div class="form-group">
        <label>{{ label }} <i class="fa" v-if="activated"
                           :class="validClass"></i></label>
        <input type="text" class="form-control"
               :value="value"
               @input="onInput">
        <div class="alert alert-danger" v-if="!pattern.test(value) && activated">
            {{ errorMessage }}
        </div>
        <div class="alert alert-danger" v-if="unique.required && !unique.value && activated">{{ uniqueMessage }}</div>
    </div>
</template>

<script>
export default {
  props: ['label', 'value', 'pattern', 'errorMessage', 'unique'],
  data() {
    return {
      activated: this.value !== '',
    };
  },
  computed: {
    validClass() {
      return this.pattern.test(this.value) && this.unique.value
        ? 'fa-check-circle'
        : 'fa-exclamation-circle';
    },
    uniqueMessage() {
      return `Field ${this.label} must be unique!`;
    },
  },
  methods: {
    onInput(e) {
      this.activated = true;

      this.$emit('changeData', {
        value: e.target.value,
        valid: this.pattern.test(e.target.value),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    label {
        font-weight: bold;
        text-align: left;
    }

    i {
        &.fa-exclamation-circle {
            &:before {
                 color: #dc3545;
             }
         }
    }

    i {
        &.fa-check-circle {
            &:before {
                color: #28a745;
            }
        }
    }
</style>
