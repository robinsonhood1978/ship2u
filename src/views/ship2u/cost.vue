<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent="validationForm">
      <b-row>
        <b-col md="6">
          <b-form-group
            label="Length"
            label-for="Length"
          >
            <validation-provider
              #default="{ errors }"
              name="Length"
              rules="required"
            >
              <b-input-group
                append="cm"
              >
                <b-form-input
                  id="Length"
                  v-model="cal.length"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  placeholder=""
                  step="any"
                  @change="volumeCalc"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Width"
            label-for="Width"
          >
            <validation-provider
              #default="{ errors }"
              name="Width"
              rules="required"
            >
              <b-input-group
                append="cm"
              >
                <b-form-input
                  id="Width"
                  v-model="cal.width"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  placeholder=""
                  step="any"
                  @change="volumeCalc"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Height"
            label-for="Height"
          >
            <validation-provider
              #default="{ errors }"
              name="Height"
              rules="required"
            >
              <b-input-group
                append="cm"
              >
                <b-form-input
                  id="Height"
                  v-model="cal.height"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  placeholder=""
                  step="any"
                  @change="volumeCalc"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Volume"
            label-for="Volume"
          >
            <validation-provider
              #default="{ errors }"
              name="Volume"
              rules="required"
            >
              <b-input-group
                append="m³"
              >
                <b-form-input
                  id="Volume"
                  v-model="cal.volume"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  step="any"
                  placeholder=""
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Weight"
            label-for="Weight"
          >
            <validation-provider
              #default="{ errors }"
              name="Weight"
              rules="required"
            >
              <b-input-group
                append="kg"
              >
                <b-form-input
                  id="Weight"
                  v-model="cal.weight"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  step="any"
                  placeholder=""
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- submit and reset -->
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
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col>
        <quote-list
          v-if="quote"
          :items="quote"
        />
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BInputGroup, BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import QuoteList from './QuoteList.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BInputGroup,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    QuoteList,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      quote: null,
      cal: {
        length: '10', width: '20', height: '30', volume: '', weight: '', lang: 'en-us',
      },
      required,
    }
  },
  methods: {
    volumeCalc() {
      // eslint-disable-next-line no-mixed-operators
      this.cal.volume = this.cal.length / 100 * this.cal.width / 100 * this.cal.height / 100
      this.cal.volume = parseFloat(this.cal.volume.toFixed(3))
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log(this.cal)
          this.$store.dispatch('ship2u/quote', { order: this.cal })
            .then(res => {
              this.quote = res
              console.log(res)
            })
        }
      })
    },
  },
}
</script>
