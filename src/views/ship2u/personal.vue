<template>
  <b-card-code title="Bind Website Account">
    <b-card
      border-variant="warning"
      bg-variant="transparent"
      class="shadow-none"
    >
      <b-card-text>We need your information to identify your cargo
      </b-card-text>
    </b-card>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent="validationForm">
        <b-row>
          <!-- username -->
          <b-col cols="12">
            <b-form-group
              label="Name"
              label-for="fh-usename"
            >
              <validation-provider
                #default="{ errors }"
                name="Name"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="fh-usename"
                    v-model="profile.name"
                    placeholder="Name"
                  />
                </b-input-group>
                <b-form-text class="text-danger">
                  Please use your real name, which needs to be filled in the recipient of the warehousing package.
                </b-form-text>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- email -->
          <b-col cols="12">
            <b-form-group
              label="Email"
              label-for="fh-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="fh-email"
                    v-model="profile.email"
                    type="email"
                    placeholder="Email"
                  />
                </b-input-group>
                <b-form-text class="text-danger">
                  Enter a Valid Email. It is used to receive cargo reminders.
                </b-form-text>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- mobile -->
          <b-col cols="12">
            <b-form-group
              label="Mobile"
              label-for="vi-mobile"
            >
              <validation-provider
                #default="{ errors }"
                name="Mobile"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-mobile"
                    v-model="profile.tel"
                    type="number"
                    placeholder="Mobile"
                  />
                </b-input-group>
                <b-form-text class="text-danger">
                  Please fill in the commonly used mobile phone number, used to communicate urgent cargo matters
                </b-form-text>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              Submit
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              @click="reset"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BCard,
  BCardText,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormText,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardText,
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BForm,
    BFormText,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      mobile: '',
      required,
    }
  },
  computed: {
    validation() {
      return this.mobile.length > 8 && this.mobile.length < 16
    },
    profile() {
      return {
        name: this.$store.state.ship2u.userProfile.customer.first_name,
        email: this.$store.state.ship2u.userProfile.customer.email,
        tel: this.$store.state.ship2u.userProfile.customer.tel,
      }
    },
  },
  methods: {
    reset() {
      this.mobile = ''
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // console.log(this.profile)
          this.$store
            .dispatch('ship2u/updateProfile', this.profile)
            .then(response => {
              console.log(response)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation successful',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })

              setTimeout(() => {
                this.$router.go(-1)
              }, 3000)
            })
            .catch(ex => {
              console.log(ex)
            })
        }
      })
    },
  },
  setup() {

  },
}
</script>
