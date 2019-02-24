<template>
    <form @submit.prevent="sendData">
        <div class="progress">
            <div class="progress-bar" :style="properties"></div>
        </div>
        <div>
            <form-field v-for="(field, index) in fields"
                        :label="field.label"
                        :value="field.value"
                        :pattern="field.pattern"
                        :errorMessage="field.errorMessage"
                        :unique="field.unique"
                        :key="index"
                        @changeData="onChangeData(index, $event)">
            </form-field>
        </div>
        <button class="btn btn-primary" :disabled="done < fields.length">
            Send Data
        </button>
    </form>
</template>

<script>
import FormField from './FormField.vue';

export default {
  props: {
    fields: {
      type: Array,
      required: true,
      default: [],
    },
  },

  data() {
    return {
      controls: [],
      done: 0,
    };
  },

  components: {
    FormField,
  },

  created() {
    this.fields.forEach(field => this.controls.push(field.pattern.test(field.value)));
  },

  methods: {
    onChangeData(index, data) {
      this.$emit('updateFieldByIndex', data.value, index);
      this.controls[index] = data.valid;

      let done = 0;

      this.controls.map((item) => {
        if (item) {
          done += 1;
        }
      });

      this.done = done;
    },

    sendData() {
      this.$emit('sendData');
    },
  },

  computed: {
    properties() {
      return {
        width: `${this.done / this.fields.length * 100}%`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>

    a {
        color: #42b983;
    }

    .progress {
        margin-bottom: 30px;
    }

    .sample .form-group {
        text-align: left;
    }
</style>
