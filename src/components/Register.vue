<template>
    <div class="page page-register">
        <div class="container">
            <h1>Register</h1>

            <hr>

            <validate-form :fields="formFields"
                           @updateFieldByIndex="updateField"
                           @sendData="register"
            ></validate-form>

        </div>
    </div>
</template>

<script>
import ValidateForm from './form/ValidateForm';
import User from '../models/User';

export default {
  name: 'Register',
  data() {
    return {
      formFields: [
        {
          label: 'First Name',
          name: 'firstName',
          value: '',
          type: 'text',
          pattern: /^[a-zA-Z ]{2,30}$/,
          unique: {
            required: false,
            value: true,
          },
          errorMessage: 'Имя должно быть на латинице и содержать от 2 до 30 символов',
        },
        {
          label: 'Last Name',
          name: 'lastName',
          value: '',
          type: 'text',
          pattern: /^[a-zA-Z ]{2,30}$/,
          unique: {
            required: false,
            value: true,
          },
          errorMessage: 'Имя должно быть на латинице и содержать от 2 до 30 символов',
        },
        {
          label: 'Username',
          name: 'username',
          value: '',
          type: 'text',
          pattern: /^[a-zA-Z ]{5,30}$/,
          unique: {
            required: true,
            value: true,
          },
          errorMessage: 'Имя должно быть на латинице и содержать от 2 до 30 символов',
        },
        {
          label: 'Email',
          name: 'email',
          value: '',
          type: 'email',
          pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          unique: {
            required: true,
            value: true,
          },
          errorMessage: 'Не корректный email',
        },
        {
          label: 'Phone',
          name: 'phone',
          value: '',
          type: 'text',
          pattern: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
          unique: {
            required: false,
            value: true,
          },
          errorMessage: 'Телефон должен содержать код Украины и начинаться на +380 и содержать 13 символов',
        },
      ],
      uniqueFields: [],
    };
  },
  components: {
    ValidateForm,
  },
  methods: {
    async register() {
      const readyForRegister = await this.checkUniqueFields();

      if (readyForRegister) {
        const user = await User.create({
          ...this.getUserData(),
          photo: '',
          geo: {
            lat: 50.2678812,
            lng: 28.6386983,
          },
          created_at: new Date(),
        });

        this.$router.push({
          name: 'profile',
          params: {
            id: user.id,
          },
        });
      }
    },

    async checkUniqueFields() {
      let countUniqueFields = 0;

      await Promise.all(this.uniqueFields.map(async (field) => {
        const user = await User.getUserByField(field.name, field.value);
        const indexField = this.formFields.findIndex(currentField => currentField.name === field.name);

        if (user) {
          this.formFields[indexField].unique.value = false;
        } else {
          this.formFields[indexField].unique.value = true;
          countUniqueFields += 1;
        }
      }));

      return countUniqueFields === this.uniqueFields.length;
    },

    updateField(value, index) {
      this.formFields[index].value = value;
    },

    getUniqueFields() {
      return this.formFields.filter(field => field.unique.required);
    },

    getUserData() {
      const userData = {};

      this.formFields.forEach(field => userData[field.name] = field.value);

      return userData;
    },
  },

  created() {
    this.uniqueFields = this.getUniqueFields();
  },
};
</script>

<style scoped>

</style>
